import { useEffect, useState } from "react";

const LINES = [
  "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
  "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
  "-SERVER 1-",
  "",
  "VAULT-TEC TERMINAL // VAULT 404 // SUNSARI WASTELAND",
  "MEMORY CHECK ............ 64K OK",
  "RADIATION LEVEL ......... NOMINAL-ish",
  "LOADING DWELLER PROFILE . AARYAN DHKAL",
];

const BAR_LEN = 26;

/** Full unskippable boot (~4s). Shortened when reduced motion is on. */
export default function Boot({ onDone }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    if (tick >= LINES.length + BAR_LEN) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTick((v) => v + 1), tick < LINES.length ? 260 : 55);
    return () => clearTimeout(t);
  }, [tick, onDone]);

  const shown = LINES.slice(0, Math.min(tick, LINES.length));
  const barCount = Math.max(0, Math.min(BAR_LEN, tick - LINES.length));
  const bar = "█".repeat(barCount) + "░".repeat(BAR_LEN - barCount);

  return (
    <div className="crt pip-glow flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="pip-panel pip-corners p-6 sm:p-8">
          <div className="font-display text-xl leading-snug sm:text-2xl" aria-live="polite">
            {shown.map((l, i) => (
              <p key={i}>{l || "\u00A0"}</p>
            ))}
            {tick >= LINES.length && (
              <>
                <p className="mt-4">LOADING [ {bar} ] {Math.round((barCount / BAR_LEN) * 100)}%</p>
                <p className="type-caret"> </p>
              </>
            )}
            {tick < LINES.length && <p className="type-caret"> </p>}
          </div>
          <p className="mt-6 text-xs tracking-[0.3em] opacity-60">
            PLEASE STAND BY — DO TURN AWAY
          </p>
        </div>
      </div>
    </div>
  );
}
