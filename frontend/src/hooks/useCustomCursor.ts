import { useEffect, useRef, useState } from "react";

import {
  CURSOR_HOVER_SCALE,
  CURSOR_LERP,
  CURSOR_SIZE,
  INTERACTIVE_SELECTOR,
  MAX_STRETCH,
  SCALE_LERP,
  STRETCH_FACTOR,
} from "../components/common/custom-cursor/constants";

type CursorState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  prevX: number;
  prevY: number;
  scale: number;
  targetScale: number;
  visible: boolean;
};

const initialState = (): CursorState => ({
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  prevX: 0,
  prevY: 0,
  scale: 1,
  targetScale: 1,
  visible: false,
});

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR))
  );
}

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>(initialState());
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const state = stateRef.current;
    let frameId = 0;
    let isSynced = false;

    const setTargetScale = (hovered: boolean) => {
      state.targetScale = hovered ? CURSOR_HOVER_SCALE : 1;
    };

    const syncPosition = (x: number, y: number) => {
      state.x = x;
      state.y = y;
      state.targetX = x;
      state.targetY = y;
      state.prevX = x;
      state.prevY = y;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isSynced) {
        syncPosition(event.clientX, event.clientY);
        isSynced = true;
      }

      state.targetX = event.clientX;
      state.targetY = event.clientY;
      state.visible = true;
      setTargetScale(isInteractiveTarget(event.target));
    };

    const onPointerOver = (event: PointerEvent) => {
      setTargetScale(isInteractiveTarget(event.target));
    };

    const onPointerLeave = () => {
      state.visible = false;
    };

    const animate = () => {
      const lerp = CURSOR_LERP;
      const scaleLerp = SCALE_LERP;

      state.x += (state.targetX - state.x) * lerp;
      state.y += (state.targetY - state.y) * lerp;
      state.scale += (state.targetScale - state.scale) * scaleLerp;

      const velocityX = state.x - state.prevX;
      const velocityY = state.y - state.prevY;
      state.prevX = state.x;
      state.prevY = state.y;

      const speed = Math.hypot(velocityX, velocityY);
      const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
      const stretch = Math.min(speed * STRETCH_FACTOR, MAX_STRETCH);

      const baseSize = CURSOR_SIZE * state.scale;
      const scaleX = baseSize * (1 + stretch);
      const scaleY = baseSize * (1 - stretch * 0.65);

      const dot = dotRef.current;
      if (dot) {
        dot.style.opacity = state.visible ? "1" : "0";
        dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX / CURSOR_SIZE}, ${scaleY / CURSOR_SIZE})`;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return { dotRef, enabled };
}
