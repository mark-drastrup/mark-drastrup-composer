import { useEffect, useRef, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export function useAudioTime(getPosition: () => number) {
  const frameRef = useRef<number>();
  const [pos, setPos] = useState(0);
  // const { getPosition } = useGlobalAudioPlayer();

  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition]);

  return Math.floor(pos);
}
