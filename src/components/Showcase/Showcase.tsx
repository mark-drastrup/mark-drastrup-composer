"use client";

import { useState } from "react";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import styles from "./showcase.module.css";

export type ShowcaseTrack = {
  _id: string;
  title: string;
  audioUrl: string;
};

type ShowcaseProps = {
  tracks: ShowcaseTrack[];
};

export function Showcase({ tracks }: ShowcaseProps) {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<
    string | null
  >(null);

  return (
    <section className={styles.songs} id="songs">
      {tracks.map((track) => (
        <AudioPlayer
          key={track._id}
          id={track._id}
          title={track.title}
          path={track.audioUrl}
          currentlyPlayingTrack={currentlyPlayingTrack}
          setCurrentlyPlayingTrack={setCurrentlyPlayingTrack}
        />
      ))}
      <div className={styles.gradient}></div>
    </section>
  );
}
