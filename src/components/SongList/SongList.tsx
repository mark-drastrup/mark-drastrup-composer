"use client";

import { useState } from "react";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import styles from "./song-list.module.css";

const SONGS = [
  {
    title: "Noble Fool",
    path: "audio/noble_fool.wav",
  },
  {
    title: "Betrayal",
    path: "audio/betrayal.wav",
  },
  {
    title: "Synthetic Dreams",
    path: "audio/synthetic_dreams.wav",
  },
  {
    title: "Waltzing Away",
    path: "audio/waltzing_away.wav",
  },
];

export function SongList() {
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState<
    string | null
  >(null);

  return (
    <section className={styles.songs} id="songs">
      {SONGS.map((song) => (
        <AudioPlayer
          key={song.title}
          title={song.title}
          path={song.path}
          currentlyPlayingSong={currentlyPlayingSong}
          setCurrentlyPlayingSong={setCurrentlyPlayingSong}
        />
      ))}
      <div className={styles.gradient}></div>
    </section>
  );
}
