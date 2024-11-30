"use client";

import { BurgerMenu, Waves } from "@/icons";
import { LogoAndNameWhite } from "@/icons/LogoAndNameWhite";
import styles from "./Header.module.css";
import { useState } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.gradient}></div>
      <div className={styles["logo-wrapper"]}>
        <LogoAndNameWhite />
      </div>
      <BurgerMenu onClick={() => setOpenMenu(!openMenu)} />

      <nav
        className={`${styles.navigation} ${
          openMenu ? styles["navigation-open"] : ""
        }`}
      >
        <a className={styles.navlink} href="/#about">
          Home
        </a>
        <a className={styles.navlink} href="/#projects">
          Songs
        </a>
        <a className={styles.navlink} href="/#contact">
          About
        </a>

        <Waves className={styles.waves} />
      </nav>
    </header>
  );
}
