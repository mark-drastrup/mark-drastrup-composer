import { LogoPurple } from "@/icons";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <LogoPurple className={styles.logo} />

        <nav>
          <ul className={styles["nav-list"]}>
            <li className={styles["list-item"]}>
              <a href="/#home">Home</a>
            </li>
            <li className={styles["list-item"]}>
              <a href="/#songs">Songs</a>
            </li>
            <li className={styles["list-item"]}>
              <a href="/#about">About</a>
            </li>
            <li className={styles["list-item"]}>
              <a href="/#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      <p className={styles.copyright}>
        © 2026 Mark Drastrup. <br className={styles.break} /> All rights
        reserved.
      </p>
    </footer>
  );
}
