import styles from "./RouteFallback.module.scss";

export function RouteFallback() {
  return (
    <div className={styles.fallback} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.fallback__label}>Loading…</span>
    </div>
  );
}
