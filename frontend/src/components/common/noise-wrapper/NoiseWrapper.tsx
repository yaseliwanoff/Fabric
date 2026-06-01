import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

import styles from "./NoiseWrapper.module.scss";

export type NoiseWrapperProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  visibility?: number;
  motion?: number;
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function NoiseWrapper({
  children,
  className,
  contentClassName,
  overlayClassName,
  visibility = 0.72,
  motion = 0.22,
  style,
  ...rest
}: NoiseWrapperProps) {
  const rootClassName = [styles.wrapper, className].filter(Boolean).join(" ");
  const contentClass = [styles.wrapper__content, contentClassName]
    .filter(Boolean)
    .join(" ");
  const overlayClass = [styles.wrapper__noise, overlayClassName]
    .filter(Boolean)
    .join(" ");

  const visibilityValue = clamp01(visibility);
  const motionValue = clamp01(motion);
  const durationSec = 14 - motionValue * 9;
  const shiftPx = 16 + motionValue * 64;

  return (
    <div
      className={rootClassName}
      style={
        {
          ...style,
          "--noise-opacity": visibilityValue,
          "--noise-duration": `${durationSec}s`,
          "--noise-shift": `${shiftPx}px`,
        } as CSSProperties
      }
      {...rest}
    >
      <div className={contentClass}>{children}</div>
      <span className={overlayClass} aria-hidden="true" />
    </div>
  );
}
