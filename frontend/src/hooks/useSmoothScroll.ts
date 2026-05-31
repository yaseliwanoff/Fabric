import Lenis from "lenis";
import { useEffect } from "react";

import { emitScroll, setScrollY } from "@/lib/scrollEvents";

export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncNativeScroll = () => {
      setScrollY(window.scrollY);
      emitScroll();
    };

    if (reducedMotion.matches) {
      window.addEventListener("scroll", syncNativeScroll, { passive: true });
      syncNativeScroll();

      return () => {
        window.removeEventListener("scroll", syncNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    let frameId = 0;

    const onLenisScroll = (instance: Lenis) => {
      setScrollY(instance.actualScroll);
      emitScroll();
    };

    lenis.on("scroll", onLenisScroll);

    const onFrame = (time: number) => {
      lenis.raf(time);
      setScrollY(lenis.actualScroll);
      emitScroll();
      frameId = requestAnimationFrame(onFrame);
    };

    frameId = requestAnimationFrame(onFrame);
    syncNativeScroll();

    return () => {
      lenis.off("scroll", onLenisScroll);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
}
