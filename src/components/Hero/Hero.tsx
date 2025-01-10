import { Waves } from "@/icons";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles["hero-wrapper"]}>
      {/* <h1 className={styles.title}>
        COMPOSER FOR GAMES <br /> AND FILM
      </h1> */}

      <h1 className={styles.title}>
        VIDEO GAME MUSIC & <br /> FILM COMPOSER
      </h1>

      <iframe
        className={styles.video}
        src="https://www.youtube.com/embed/K3HzzcI1cxE?si=ythiWE5rdNDW86ak"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <Waves className={styles.waves} />
    </section>
  );
}
