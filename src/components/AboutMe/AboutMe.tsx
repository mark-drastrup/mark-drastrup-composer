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

        {/* <p className={styles.paragraph}>
          I believe that music is more than just a background element —
          it&apos;s an essential part of storytelling, capable of conveying
          emotions, setting the tone, and immersing audiences in ways words
          alone cannot. Each piece I compose is crafted with this philosophy in
          mind, ensuring that the music not only supports but also enhances the
          world it inhabits.
        </p> */}

        <p className={styles.paragraph}>
          With a blend of traditional orchestration and modern electronic sound
          design, I strive to create music that is both timeless and innovative,
          perfectly tailored to the unique stories of games and films.
        </p>
      </div>

      <Image
        src="/images/profile.jpg"
        alt="Composer Picture"
        width="100"
        height="100"
        className={styles.image}
      />
    </section>
  );
}
