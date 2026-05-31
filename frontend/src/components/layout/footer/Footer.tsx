import styles from "./Footer.module.scss";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <p className={styles.footer__copy}>© {year} Fabric</p>
      </div>
    </footer>
  );
}
