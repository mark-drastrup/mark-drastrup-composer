import Image from "next/image";
import styles from "./about-me.module.css";

export function AboutMe() {
  return (
    <section className={styles["about-me"]} id="about">
      <div className={styles["text-wrapper"]}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.paragraph}>
          I am a composer who specializes in video game music. With influences
          from The Legend of Zelda, Final Fantasy, Dark Souls and Octopath
          Traveler, my goal is to create soundscapes that resonate emotionally
          and amplify the narratives they accompany.
        </p>

        <p className={styles.paragraph}>
          I have loved video games since I was a child, especially series like
          The Legend of Zelda, Super Mario and Final Fantasy, and I still enjoy
          them to this day.
        </p>

        <p className={styles.paragraph}>
          In addition to composing, I have a background in software development.
          This allows me to communicate effectively with developers and
          understand the technical side of implementation, making collaboration
          smoother and more efficient.
        </p>

        {/* Add credits when I have them */}

        <p className={styles.paragraph}>
          If you’re interested in working together feel free to reach out using
          the form below.
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
