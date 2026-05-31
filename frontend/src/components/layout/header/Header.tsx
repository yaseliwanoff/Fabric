import { Link } from "react-router";
import { headerNavMenu } from "@mocks/header/nav";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className={styles.header__wrapper}>
        <Link className={styles["header__wrapper--logo"]} to={"/"}>
          <img src="/images/png/logo.png" alt="logo" />
        </Link>
        <nav
          className={styles["header__wrapper--nav"]}
          aria-label="Main navigation"
        >
          <ul className={styles.nav__list}>
            {headerNavMenu.map((item) => (
              <li key={item.id} className={styles.nav__item}>
                <Link className={styles.nav__link} to={item.link}>
                  {item.name}
                  {item?.count && (
                    <p className={styles.nav__count}>{item.count}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className={styles["header__wrapper--burger"]}>
          <img src="/icons/burger.svg" alt="burger" title="Открыть меню" />
        </button>
      </div>
    </header>
  );
}
