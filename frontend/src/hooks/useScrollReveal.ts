import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type UseScrollRevealOptions = {
  initialScale?: number;
  initialOffset?: number;
  overlapRatio?: number;
  stickyTopDesktop?: number;
  stickyTopTablet?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number): number {
  return 1 - (1 - value) ** 3;
}

function getStickyTop(desktop: number, tablet: number): number {
  return window.matchMedia("(max-width: 768px)").matches ? tablet : desktop;
}

export function useScrollReveal({
  initialScale = 0.94,
  initialOffset = 160,
  overlapRatio = 0.5,
  stickyTopDesktop = 122,
  stickyTopTablet = 50,
}: UseScrollRevealOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>(() => ({
    transform: `translate3d(0, ${initialOffset}px, 0) scale(${initialScale})`,
    transformOrigin: "top center",
  }));

  useLayoutEffect(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) {
      return;
    }

    const updateLayout = () => {
      const panelHeight = panel.getBoundingClientRect().height;
      const overlap = Math.round(panelHeight * overlapRatio);
      const scrollHeight = Math.max(
        Math.abs(initialOffset) + Math.round(panelHeight * 0.12),
        160,
      );

      track.style.setProperty("--intro-overlap", `-${overlap}px`);
      track.style.setProperty(
        "--intro-flow-height",
        `${Math.round(panelHeight)}px`,
      );
      track.style.setProperty(
        "--intro-scroll-height",
        `${Math.round(scrollHeight)}px`,
      );
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(panel);
    window.addEventListener("resize", updateLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [initialOffset, overlapRatio]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setPanelStyle({ transform: "none" });
      return;
    }

    let frameId = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const stickyTop = getStickyTop(stickyTopDesktop, stickyTopTablet);
      const scrollHeight = Number.parseFloat(
        getComputedStyle(track).getPropertyValue("--intro-scroll-height"),
      );
      const animationRange =
        Number.isFinite(scrollHeight) && scrollHeight > 0
          ? scrollHeight
          : Math.abs(initialOffset);

      const scrolledInTrack = stickyTop - track.getBoundingClientRect().top;
      const progress = easeOutCubic(
        clamp(scrolledInTrack / animationRange, 0, 1),
      );
      const scale = initialScale + (1 - initialScale) * progress;
      const translateY = initialOffset * (1 - progress);

      setPanelStyle({
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        transformOrigin: "top center",
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [initialOffset, initialScale, stickyTopDesktop, stickyTopTablet]);

  return { trackRef, panelRef, panelStyle };
}
