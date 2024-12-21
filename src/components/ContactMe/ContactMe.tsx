import { LogoHalf } from "@/icons";
import styles from "./contact-me.module.css";

export function ContactMe() {
  return (
    <div className={styles["contact-me"]} id="contact">
      <h2 className={styles.title}>Contact Me</h2>

      <p className={styles.paragraph}>
        I&apos;d love to hear from you!
        <br />
        <br />
        Whether you’re interested in collaborating, have a project in mind, or
        just want to chat about music, feel free to reach out.
      </p>

      <LogoHalf className={styles.logo} />
    </div>
  );
}
