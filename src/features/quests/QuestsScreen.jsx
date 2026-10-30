import { useState } from "react";
import { ArrowUpRight, Caret, Chevron, Dot, DoubleSlash, IconQuest, Plus } from "@/components/icons";
import { QUESTS } from "@/features/quests/quests";
import { blip } from "@/lib/audio";

export default function QuestsScreen({ sound }) {
  const [sel, setSel] = useState(0);
  const q = QUESTS[sel];

  const pick = (i) => {
    setSel(i);
    if (sound) blip(500 + i * 45);
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[340px_1fr] lg:grid-rows-1">
      <section aria-label="Quest list" className="pip-panel pip-corners flex flex-col p-3">
        <h2 className="font-display pip-glow flex items-center gap-2 px-2 pt-1 text-2xl tracking-widest">
          <IconQuest />
          QUEST LOG <span className="opacity-60">({QUESTS.length})</span>
        </h2>
        <ul role="listbox" aria-activedescendant={q.id} className="mt-2 max-h-[420px] overflow-y-auto lg:max-h-none">
          {QUESTS.map((item, i) => (
            <li key={item.id} id={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={sel === i}
                onClick={() => pick(i)}
                className={`group flex w-full items-center gap-2 px-3 py-3 text-left transition-all hover:translate-x-1 ${
                  sel === i
                    ? "bg-[var(--pip-faint)]"
                    : "opacity-70 hover:opacity-100 hover:bg-[var(--pip-faint)]/40"
                }`}
              >
                <span className="inline-flex w-4 justify-center text-xl">
                  {sel === i ? (
                    <Caret />
                  ) : (
                    <>
                      <Dot className="opacity-70 group-hover:hidden" />
                      <Chevron className="hidden group-hover:block" />
                    </>
                  )}
                </span>
                <span className="font-display block text-xl leading-tight tracking-wider">{item.name}</span>
                <span className="ml-auto text-sm tabular">[{String(i + 1).padStart(2, "0")}]</span>
              </button>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-auto border-t pip-rule pt-3 text-sm tracking-[0.2em] opacity-80">
          <Caret className="mr-1" /> {q.name} <DoubleSlash /> {q.kind}
        </p>
      </section>

      <article aria-label="Quest dossier" aria-live="polite" className="pip-panel pip-corners relative flex flex-col p-5 sm:p-6">
        <div key={q.id} className="animate-screen-in-fast flex flex-1 flex-col justify-evenly">
          <h3 className="font-display pip-glow text-4xl tracking-wider">{q.name}</h3>

          <p className="mt-4 border-l-4 border-[var(--pip)] pl-3 font-display text-2xl leading-snug">
            OBJECTIVE: {q.objective}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed opacity-90">{q.notes}</p>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Rewards">
            {q.reward.map((r) => (
              <span key={r} className="tag-hover border pip-rule px-3.5 py-1.5 text-sm tracking-[0.2em]">
                <Plus className="mr-1.5" />
                {r}
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
                  ACCEPT TRANSMISSION <ArrowUpRight className="ml-2" />
                </a>
              </>
            ) : (
              <span className="border-2 border-dashed pip-rule px-6 py-2 font-display text-2xl tracking-widest opacity-70">
                NO PUBLIC FREQUENCY <DoubleSlash /> CLASSIFIED
              </span>
            )}
          </div>

          <div
            aria-hidden="true"
            className="animate-stamp font-display pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] border-8 border-[var(--pip)] px-6 py-2 text-center opacity-80 sm:left-3/4"
          >
            <p className="font-display pip-glow whitespace-nowrap text-5xl tracking-[0.18em]">{q.status}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
