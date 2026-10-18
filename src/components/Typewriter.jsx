import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Typewriter({
  lines,
  speed = 14,
  lineDelay = 120,
  className = "",
  onDone,
}) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const total = lines.join("\n").length;

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return undefined;
    }
    if (count >= total) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return undefined;
    }
    const flat = lines.join("\n");
    const atNewline = flat[count] === "\n";
    const t = setTimeout(() => setCount((c) => c + 1), atNewline ? lineDelay : speed);
    return () => clearTimeout(t);
  }, [count, total, reduced, lines, speed, lineDelay, onDone]);

  const flat = lines.join("\n").slice(0, count);

  return (
    <div className={className} aria-live="polite">
      {flat.split("\n").map((p, i, all) => (
        <p key={i} className={i === all.length - 1 ? "type-caret" : ""}>
          {p || "\u00A0"}
        </p>
      ))}
    </div>
  );
}
