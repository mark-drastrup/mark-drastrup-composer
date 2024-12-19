import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import styles from "./song-list.module.css";

const SONGS = [
  {
    title: "Waltzing Away",
    path: "audio/waltzing_away.wav",
  },
  {
    title: "Battle Music",
    path: "audio/battle_music.wav",
  },
];

export function SongList() {
  return (
    <section className={styles.songs} id="songs">
      {SONGS.map((song) => (
        <AudioPlayer key={song.title} title={song.title} path={song.path} />
      ))}
    </section>
  );
}
