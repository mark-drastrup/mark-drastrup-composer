import Image from "next/image";
import styles from "./about-me.module.css";

export function AboutMe() {
  return (
    <section className={styles["about-me"]} id="about">
      <div className={styles["text-wrapper"]}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.paragraph}>
          I am a passionate composer specializing in music for video games and
          film. Whether through sweeping orchestral scores or dynamic electronic
          compositions, my goal is to create soundscapes that resonate
          emotionally and amplify the narratives they accompany.
        </p>

        <p className={styles.paragraph}>
          With a blend of traditional orchestration and modern electronic sound
          design, I strive to create music that is both timeless and innovative,
          perfectly tailored to the unique stories of games and films.
        </p>
      </div>

      <div className={styles["image-wrapper"]}>
        <Image
          src="/images/profile.jpg"
          alt="Composer Picture"
          fill
          sizes="(max-width: 1024px) 100vw, 465px"
        />
      </div>
    </section>
  );
}
