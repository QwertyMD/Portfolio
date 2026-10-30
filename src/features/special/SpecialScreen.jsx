import { useState } from "react";
import ScreenNav from "@/components/ScreenNav";
import { Caret, DoubleSlash, IconStar, Slash } from "@/components/icons";
import Meter from "@/features/special/Meter";
import { SPECIAL, SPECIAL_CAP } from "@/features/special/special";
import { blip } from "@/lib/audio";

export default function SpecialScreen({ sound }) {
  const [sel, setSel] = useState(4);
  const s = SPECIAL[sel];
  const total = SPECIAL.reduce((n, a) => n + a.value, 0);

  const pick = (i) => {
    setSel(i);
    if (sound) blip(600 + SPECIAL[i].value * 40);
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[1fr_360px] lg:grid-rows-1">
      <section aria-label="S.P.E.C.I.A.L attributes" className="pip-panel pip-corners flex flex-col p-4 sm:p-5">
        <h2 className="font-display flex items-center gap-2 text-3xl tracking-widest pip-glow">
          <IconStar />
          S.P.E.C.I.A.L
        </h2>
        <ul className="mt-3 divide-y divide-[var(--pip-dim)] border-y pip-rule">
          {SPECIAL.map((a, i) => (
            <li key={a.letter}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={sel === i}
                className={`flex w-full items-center gap-3 px-2 py-3 text-left transition-all hover:translate-x-1 sm:gap-4 ${
                  sel === i ? "bg-[var(--pip-faint)]" : "hover:bg-[var(--pip-faint)]/50"
                }`}
              >
                <span className={`inline-block w-6 ${sel === i ? "" : "opacity-0"}`}>
                  <Caret />
                </span>
                <span className={`font-display text-3xl ${sel === i ? "pip-glow" : "opacity-70"}`}>
                  {a.letter}
                </span>
                <span className="font-display w-32 text-xl tracking-wider sm:w-40">{a.name}</span>
                <span className="hidden text-xs tracking-[0.2em] opacity-60 md:inline">{a.tag}</span>
                <span className="ml-auto hidden sm:inline" aria-hidden="true">
                  <Meter value={a.value} />
                </span>
                <span className="tabular ml-3">{String(a.value).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-3 text-xs tracking-[0.3em] opacity-60">
          SELECT AN ATTRIBUTE TO INSPECT <DoubleSlash className="opacity-70" /> TOTAL{" "}
          {total}
          <Slash className="mx-1 opacity-70" />
          {SPECIAL_CAP}
        </p>
      </section>

      <aside key={s.letter} aria-label="Attribute detail" aria-live="polite" className="animate-screen-in-fast pip-panel pip-corners flex flex-col p-5">
        <p className="font-display pip-glow leading-none text-[120px]">{s.letter}</p>
        <p className="font-display text-3xl tracking-widest">{s.name}</p>
        <p className="text-sm tracking-[0.3em] opacity-70">{s.tag}</p>
        <div className="mt-3">
          <span className="font-display text-2xl leading-none" role="img" aria-label={`${s.value} of 10`}>
            <Meter value={s.value} />
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed">{s.desc}</p>
        <p className="mt-3 border-t pip-rule pt-3 text-sm tracking-[0.15em] opacity-80">
          FIELD PROOF: {s.proof}
        </p>
        <ScreenNav
          labeled
          onPrev={() => pick((sel + SPECIAL.length - 1) % SPECIAL.length)}
          onNext={() => pick((sel + 1) % SPECIAL.length)}
        />
      </aside>
    </div>
  );
}
