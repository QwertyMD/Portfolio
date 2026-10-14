import { useState } from "react";
import { SPECIAL } from "../data";
import { blip } from "../sound";

function Pips({ value }) {
  return (
    <span className="font-display text-2xl leading-none" aria-label={`${value} of 10`}>
      {"▰".repeat(value)}
      <span className="opacity-25">{"▱".repeat(10 - value)}</span>
    </span>
  );
}

export default function SpecialScreen({ sound }) {
  const [sel, setSel] = useState(4); // Intelligence first — honest default
  const s = SPECIAL[sel];

  const pick = (i) => {
    setSel(i);
    if (sound) blip(600 + SPECIAL[i].value * 40);
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[1fr_360px] lg:grid-rows-1">
      <section aria-label="S.P.E.C.I.A.L attributes" className="pip-panel pip-corners flex flex-col p-4 sm:p-5">
        <h2 className="font-display text-3xl tracking-widest pip-glow">{"// S.P.E.C.I.A.L"}</h2>
        <ul className="mt-3 divide-y divide-[var(--pip-dim)] border-y pip-rule">
          {SPECIAL.map((a, i) => (
            <li key={a.letter}>
              <button
                onClick={() => pick(i)}
                aria-pressed={sel === i}
                className={`flex w-full items-center gap-3 px-2 py-3 text-left transition-all hover:translate-x-1 sm:gap-4 ${
                  sel === i ? "bg-[var(--pip-faint)]" : "hover:bg-[var(--pip-faint)]/50"
                }`}
              >
                <span
                  className={`font-display w-10 text-3xl ${sel === i ? "pip-glow" : "opacity-70"}`}
                >
                  {sel === i ? "> " : "  "}
                  {a.letter}
                </span>
                <span className="font-display w-32 text-xl tracking-wider sm:w-40">{a.name}</span>
                <span className="hidden text-xs tracking-[0.2em] opacity-60 md:inline">{a.tag}</span>
                <span className="font-display ml-auto hidden text-lg leading-none sm:inline" aria-hidden="true">
                  {"▰".repeat(a.value)}
                  <span className="opacity-25">{"▱".repeat(10 - a.value)}</span>
                </span>
                <span className="tabular ml-3">{String(a.value).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-[11px] tracking-[0.3em] opacity-60 mt-auto pt-3">
          SELECT AN ATTRIBUTE TO INSPECT // TOTAL {SPECIAL.reduce((n, a) => n + a.value, 0)}/70
        </p>
      </section>

      <aside key={s.letter} aria-label="Attribute detail" aria-live="polite" className="animate-screen-in-fast pip-panel pip-corners flex flex-col p-5">
        <p className="font-display pip-glow leading-none text-[120px]">{s.letter}</p>
        <p className="font-display text-3xl tracking-widest">{s.name}</p>
        <p className="text-xs tracking-[0.3em] opacity-70">{s.tag}</p>
        <div className="mt-3">
          <Pips value={s.value} />
        </div>
        <p className="mt-4 text-[15px] leading-relaxed">{s.desc}</p>
        <p className="mt-3 border-t pip-rule pt-3 text-xs tracking-[0.15em] opacity-80">
          FIELD PROOF: {s.proof}
        </p>
        <div className="mt-auto flex gap-2 pt-4">
          <button
            onClick={() => pick((sel + SPECIAL.length - 1) % SPECIAL.length)}
            className="flex-1 border-2 pip-rule py-1 font-display text-xl tracking-widest hover:bg-[var(--pip-faint)]"
          >
            ◄ PREV
          </button>
          <button
            onClick={() => pick((sel + 1) % SPECIAL.length)}
            className="flex-1 border-2 pip-rule py-1 font-display text-xl tracking-widest hover:bg-[var(--pip-faint)]"
          >
            NEXT ►
          </button>
        </div>
      </aside>
    </div>
  );
}
