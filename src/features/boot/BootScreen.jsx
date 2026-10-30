import { useEffect, useState } from "react";
import VaultTecLogo from "@/components/VaultTecLogo";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const BAR_BLOCKS = 24;
const TICK_MS = 90;
const DONE_HOLD = 500;
const REDUCED_HOLD = 700;

const STATUS_STEPS = [
  "MEMORY CHECK ......... 64K OK",
  "RADIATION LEVEL ...... NOMINAL-ish",
  "CRYO SUPPLY .......... SIPPED",
  "GEIGER COUNTER ....... LICKED",
  "DWELLER PROFILE ...... AARYAN DHAKAL",
  "WASTELAND UPLINK ..... LOCKED",
];

export default function BootScreen({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(() => (reduced ? 100 : 0));
  const done = pct >= 100;
  const filled = Math.round((pct / 100) * BAR_BLOCKS);
  const statusIndex = Math.min(
    STATUS_STEPS.length - 1,
    Math.floor((pct / 100) * STATUS_STEPS.length)
  );

  useEffect(() => {
    if (reduced || done) return undefined;
    const t = setInterval(() => {
      setPct((p) => Math.min(100, p + 2 + Math.ceil(Math.random() * 5)));
    }, TICK_MS);
    return () => clearInterval(t);
  }, [done, reduced]);

  useEffect(() => {
    if (!done) return undefined;
    const t = setTimeout(onDone, reduced ? REDUCED_HOLD : DONE_HOLD);
    return () => clearTimeout(t);
  }, [done, reduced, onDone]);

  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md animate-pip-flicker">
        <div className="pip-panel pip-corners relative flex flex-col items-center px-6 pb-8 pt-10 sm:px-10">
          <div className="logo-glow relative">
            <VaultTecLogo className="logo-power-on h-28 w-[168px] sm:h-36 sm:w-[216px]" />
          </div>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-8 flex w-full gap-[3px]"
          >
            {Array.from({ length: BAR_BLOCKS }, (_, i) => (
              <span
                key={i}
                className={`h-5 flex-1 ${
                  i < filled
                    ? "bg-[var(--pip)] shadow-[0_0_8px_var(--pip-faint)]"
                    : "border border-[var(--pip-dim)] opacity-40"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex w-full items-baseline justify-between">
            <p className="type-caret font-display text-base tracking-widest">
              {STATUS_STEPS[statusIndex]}
            </p>
            <p className="font-display pip-glow tabular text-2xl">{pct}%</p>
          </div>
          {!reduced && done && (
            <div aria-hidden="true" className="flash-overlay pointer-events-none absolute inset-0" />
          )}
        </div>
        <p className="mt-4 text-center text-xs tracking-[0.3em] opacity-60">
          PLEASE STAND BY — DON{"'"}T TURN AWAY
        </p>
      </div>
    </div>
  );
}
