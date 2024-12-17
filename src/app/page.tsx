import { AboutMe } from "@/components/AboutMe/AboutMe";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero/Hero";
import { SongList } from "@/components/SongList/SongList";

export default function LandingPage() {
  return (
    <main className={styles["main-content"]}>
      <Hero />
      <SongList />
      <AboutMe />
    </main>
  );
}
