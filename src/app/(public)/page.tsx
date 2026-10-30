import { AboutMe } from "@/components/AboutMe/AboutMe";
import styles from "./page.module.css";
import { Hero } from "@/components/Hero/Hero";
import { Showcase, type ShowcaseTrack } from "@/components/Showcase/Showcase";
import { ContactMe } from "@/components/ContactMe/ContactMe";
import { sanityFetch } from "@/sanity/lib/live";
import { SHOWCASE_QUERY } from "@/sanity/lib/queries";

async function getShowcaseTracks(): Promise<ShowcaseTrack[]> {
  try {
    const { data } = await sanityFetch({ query: SHOWCASE_QUERY });
    // Drop Tracks that are missing a title or uploaded audio
    return (data ?? []).filter(
      (track): track is ShowcaseTrack =>
        Boolean(track?.title && track?.audioUrl)
    );
  } catch (error) {
    console.error("Failed to fetch Showcase from Sanity", error);
    return [];
  }
}

export default async function LandingPage() {
  const tracks = await getShowcaseTracks();

  return (
    <main className={styles["main-content"]}>
      <Hero />
      {tracks.length > 0 && <Showcase tracks={tracks} />}
      <AboutMe />

      <section className={styles["contact-section"]}>
        <ContactMe />
      </section>
    </main>
  );
}
