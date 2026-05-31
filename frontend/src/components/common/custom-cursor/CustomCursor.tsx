import { CURSOR_SIZE } from "./constants";
import styles from "./CustomCursor.module.scss";
import { useCustomCursor } from "../../../hooks/useCustomCursor";

export function CustomCursor() {
  const { dotRef, enabled } = useCustomCursor();

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className={styles.dot}
      style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
      aria-hidden="true"
    />
  );
}
