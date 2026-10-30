import { useCallback, useEffect, useRef, useState } from "react";
import { DENIED_MESSAGE } from "@/features/shell/denied";
import { blip } from "@/lib/audio";

const DURATION = 2200;
const MARGIN = 8;
const WIDTH = 330;
const HEIGHT = 150;

export default function useAccessDenied(sound) {
  const [popup, setPopup] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback(
    (e) => {
      e.preventDefault();
      if (sound) blip(150, 0.15, "sawtooth", 0.05);
      clearTimeout(timer.current);
      setPopup({
        x: Math.max(MARGIN, Math.min(e.clientX, window.innerWidth - WIDTH)),
        y: Math.max(MARGIN, Math.min(e.clientY, window.innerHeight - HEIGHT)),
        msg: DENIED_MESSAGE,
        id: Date.now(),
      });
      timer.current = setTimeout(() => setPopup(null), DURATION);
    },
    [sound]
  );

  const dismiss = useCallback(() => setPopup(null), []);

  return { popup, show, dismiss };
}
