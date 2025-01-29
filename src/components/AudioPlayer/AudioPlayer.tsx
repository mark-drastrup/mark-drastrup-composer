"use client";

import { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import styles from "./audio-player.module.css";
import { Pause, Play } from "@/icons";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import { convertToMinutesAndSeconds } from "@/utils/convertToMinutesAndSeconds";
import { useAudioTime } from "@/hooks/useAudioTime";
import { SpeakerLoud } from "@/icons/SpeakerLoud";

type AudioPlayerProps = {
  title: string;
  path: string;
  currentlyPlayingSong: string | null;
  setCurrentlyPlayingSong: (song: string | null) => void;
};

export function AudioPlayer({
  title,
  path,
  currentlyPlayingSong,
  setCurrentlyPlayingSong,
}: AudioPlayerProps) {
  const {
    load,
    seek,
    setVolume,
    getPosition,
    play,
    pause,
    duration,
    playing,
    volume,
  } = useAudioPlayer();
  const position = useAudioTime(getPosition);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const [value, setValue] = useState([0, 0]);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  useEffect(() => {
    load(path, {
      autoplay: false,
      format: "wav",
    });
  }, []);

  useEffect(() => {
    if (!isDraggingSlider) {
      setValue([0, position]);
    }
  }, [position]);

  const onDragStart = () => {
    setIsDraggingSlider(true);
  };

  const onInput = (val: number[]) => {
    setValue(val);
  };

  const onDragEnd = () => {
    seek(value[1]);
    setIsDraggingSlider(false);
  };

  useEffect(() => {
    if (currentlyPlayingSong !== title || playing) {
      pause();
    } else {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyPlayingSong, pause, play, title]);

  const handleClick = () => {
    if (currentlyPlayingSong === title) {
      setCurrentlyPlayingSong(null);
    } else {
      setCurrentlyPlayingSong(title);
    }
  };

  return (
    <div className={styles["audio-player"]}>
      <button onClick={() => handleClick()} className={styles["play-button"]}>
        {playing ? (
          <Pause className={styles["pause-icon"]} />
        ) : (
          <Play className={styles["play-icon"]} />
        )}
      </button>
      <div className={styles["title-wrapper"]}>
        <span>{title}</span>
        <SpeakerLoud
          className={styles["speaker-icon"]}
          onMouseEnter={() => setShowVolumeMenu(true)}
        />
        {showVolumeMenu && (
          <div
            className={styles["volume-menu"]}
            onMouseLeave={() => setShowVolumeMenu(false)}
          >
            <RangeSlider
              id="volume-slider"
              thumbsDisabled={[false, false]}
              defaultValue={[0, volume]}
              orientation={"vertical"}
              onInput={(val: number[]) => setVolume(val[0])}
              min="0"
              max="1"
              step="0.1"
            />
          </div>
        )}
      </div>
      <div className={styles["progress-wrapper"]}>
        <span className={styles["time-label"]}>
          {true ? convertToMinutesAndSeconds(position) : "00:00"}
        </span>
        <RangeSlider
          id="progress-slider"
          thumbsDisabled={[true, false]}
          rangeSlideDisabled={true}
          min="0"
          max={duration}
          value={value}
          onInput={onInput}
          onThumbDragStart={onDragStart}
          onThumbDragEnd={onDragEnd}
        />
        <span className={styles["time-label"]}>
          {duration ? convertToMinutesAndSeconds(duration) : "00:00"}
        </span>
      </div>
    </div>
  );
}
