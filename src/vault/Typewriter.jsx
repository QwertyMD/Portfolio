import { useEffect, useRef, useState } from "react";

/** Types text char-by-char. Instant when reduced motion is on. */
export default function Typewriter({
  lines,
  speed = 14,
  lineDelay = 120,
  className = "",
  onDone,
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const total = lines.join("\n").length;

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }
    if (count >= total) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const flat = lines.join("\n");
    const atNewline = flat[count] === "\n";
    const t = setTimeout(
      () => setCount((c) => c + 1),
      atNewline ? lineDelay : speed
    );
    return () => clearTimeout(t);
  }, [count, total, lines, speed, lineDelay, onDone]);

  const flat = lines.join("\n").slice(0, count);
  const parts = flat.split("\n");

  return (
    <div className={className} aria-live="polite">
      {parts.map((p, i) => (
        <p key={i} className={i === parts.length - 1 ? "type-caret" : ""}>
          {p || "\u00A0"}
        </p>
      ))}
    </div>
  );
}
