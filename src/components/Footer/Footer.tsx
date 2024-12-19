import { LogoPurple } from "@/icons";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LogoPurple className={styles.logo} />

      <nav>
        <ul className={styles["nav-list"]}>
          <li className={styles["list-item"]}>
            <a>Home</a>
          </li>
          <li className={styles["list-item"]}>
            <a>Songs</a>
          </li>
          <li className={styles["list-item"]}>
            <a>About</a>
          </li>
          <li className={styles["list-item"]}>
            <a>Contact</a>
          </li>
        </ul>
      </nav>

      <p className={styles.copyright}>
        © 2024 your awesome website. <br /> All rights reserved.
      </p>
    </footer>
  );
}
