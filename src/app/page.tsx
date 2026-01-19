import { AboutMe } from "@/components/AboutMe/AboutMe";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero/Hero";
import { SongList } from "@/components/SongList/SongList";
import { ContactMe } from "@/components/ContactMe/ContactMe";
import { ContactForm } from "@/components/ContactForm/ContactForm";

export default function LandingPage() {
  return (
    <main className={styles["main-content"]}>
      <Hero />
      <SongList />
      <AboutMe />

      <section className={styles["contact-section"]}>
        <ContactMe />
      </section>
    </main>
  );
}
