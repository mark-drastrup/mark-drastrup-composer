"use client";

import { BurgerMenu, Waves } from "@/icons";
import { LogoAndNameWhite } from "@/icons/LogoAndNameWhite";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [openMenu]);

  return (
    <header className={styles.header} id="home">
      <div className={styles.gradient}></div>
      <div className={styles["logo-wrapper"]}>
        <LogoAndNameWhite />
      </div>
      <BurgerMenu
        className={styles["burger-menu"]}
        onClick={() => setOpenMenu(!openMenu)}
      />

      <nav className={styles["navigation-desktop"]}>
        <a
          className={styles.navlink}
          href="/#home"
          onClick={() => setOpenMenu(false)}
        >
          Home
        </a>
        <a
          className={styles.navlink}
          href="/#songs"
          onClick={() => setOpenMenu(false)}
        >
          Songs
        </a>
        <a
          className={styles.navlink}
          href="/#about"
          onClick={() => setOpenMenu(false)}
        >
          About
        </a>
        <a
          className={styles.navlink}
          href="/#contact"
          onClick={() => setOpenMenu(false)}
        >
          Contact
        </a>
      </nav>

      <nav
        className={`${styles.navigation} ${
          openMenu ? styles["navigation-open"] : ""
        }`}
      >
        <a
          className={styles.navlink}
          href="/#home"
          onClick={() => setOpenMenu(false)}
        >
          Home
        </a>
        <a
          className={styles.navlink}
          href="/#songs"
          onClick={() => setOpenMenu(false)}
        >
          Songs
        </a>
        <a
          className={styles.navlink}
          href="/#about"
          onClick={() => setOpenMenu(false)}
        >
          About
        </a>
        <a
          className={styles.navlink}
          href="/#contact"
          onClick={() => setOpenMenu(false)}
        >
          Contact
        </a>

        <Waves className={styles.waves} />
      </nav>
    </header>
  );
}
