import { useState } from "react";
import { QUESTS } from "../data";
import { blip } from "../sound";

export default function QuestsScreen({ sound }) {
  const [sel, setSel] = useState(0);
  const q = QUESTS[sel];

  const pick = (i) => {
    setSel(i);
    if (sound) blip(500 + i * 45);
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[340px_1fr] lg:grid-rows-1">
      {/* quest list */}
      <section aria-label="Quest list" className="pip-panel pip-corners flex flex-col p-3">
        <h2 className="font-display px-2 pt-1 text-2xl tracking-widest pip-glow">
          {"// QUEST LOG"} <span className="opacity-60">({QUESTS.length})</span>
        </h2>
        <ul className="mt-2 max-h-[420px] overflow-y-auto lg:max-h-none" role="listbox" aria-activedescendant={q.id}>
          {QUESTS.map((item, i) => (
            <li key={item.id} id={item.id}>
              <button
                role="option"
                aria-selected={sel === i}
                onClick={() => pick(i)}
                className={`group flex w-full items-baseline gap-2 px-3 py-3 text-left transition-all hover:translate-x-1 ${
                  sel === i
                    ? "bg-[var(--pip-faint)]"
                    : "opacity-70 hover:opacity-100 hover:bg-[var(--pip-faint)]/40"
                }`}
              >
                <span className="font-display text-xl">{sel === i ? ">" : (<><span className="group-hover:hidden">·</span><span className="hidden group-hover:inline">{"›"}</span></>)}</span>
                <span className="font-display block text-xl leading-tight tracking-wider">
                  {item.name}
                </span>
                <span className="ml-auto text-xs tabular">[{String(i + 1).padStart(2, "0")}]</span>
              </button>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-auto border-t pip-rule pt-3 text-xs tracking-[0.25em] opacity-80">
          {">"} {q.name} {"//"} {q.kind} {"//"} LVL {q.level}
        </p>
      </section>

      {/* dossier */}
      <article aria-label="Quest dossier" aria-live="polite" className="pip-panel pip-corners relative flex flex-col p-5 sm:p-6">
        <div key={q.id} className="animate-screen-in-fast flex flex-1 flex-col justify-evenly">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-4xl tracking-wider pip-glow">{q.name}</h3>
        </div>

        <p className="mt-4 border-l-4 border-[var(--pip)] pl-3 font-display text-2xl leading-snug">
          OBJECTIVE: {q.objective}
        </p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed opacity-90">{q.notes}</p>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Rewards">
          {q.reward.map((r) => (
            <span key={r} className="tag-hover border pip-rule px-3 py-1 text-xs tracking-[0.25em]">
              + {r}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-6">
          {q.link ? (
            <>
              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound && blip(1200, 0.09)}
                className="mt-6 inline-block bg-[var(--pip)] px-6 py-2 font-display text-2xl tracking-widest text-black transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_var(--pip-dim)] active:scale-95"
              >
                ACCEPT TRANSMISSION ↗
              </a>
              <span className="text-xs tracking-[0.25em] opacity-60">
                DEST: {q.link.replace("https://", "")}
              </span>
            </>
          ) : (
            <span className="border-2 border-dashed pip-rule px-6 py-2 font-display text-2xl tracking-widest opacity-70">
              NO PUBLIC FREQUENCY // CLASSIFIED
            </span>
          )}
        </div>

        {/* rubber stamp, slammed on the dossier's right half */}
        <div
          aria-hidden="true"
          className="animate-stamp font-display pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] border-8 border-[var(--pip)] px-6 py-2 text-center opacity-80 sm:left-3/4"
        >
          <p className="font-display whitespace-nowrap text-5xl tracking-[0.18em] pip-glow">{q.status}</p>
        </div>
        </div>
      </article>
    </div>
  );
}
