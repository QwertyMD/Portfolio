import { useState } from "react";
import { ArrowUpRight, IconRadio } from "@/components/icons";
import { RADIO } from "@/features/radio/radio";
import { blip, staticBurst } from "@/lib/audio";

const DIAL_TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function RadioScreen({ sound }) {
  const [sel, setSel] = useState(0);
  const st = RADIO[sel];
  const Emblem = st.icon;

  const tune = (i) => {
    if (i === sel) return;
    setSel(i);
    if (sound) {
      staticBurst();
      setTimeout(() => blip(880 + i * 70, 0.1), 120);
    }
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[340px_1fr] lg:grid-rows-1">
      <section aria-label="Stations" className="pip-panel pip-corners flex flex-col p-4">
        <h2 className="font-display pip-glow flex items-center gap-2 px-1 text-3xl tracking-widest">
          <IconRadio />
          FREQUENCIES
        </h2>
        <ul className="mt-2 space-y-2">
          {RADIO.map((r, i) => (
            <li key={r.freq}>
              <button
                type="button"
                onClick={() => tune(i)}
                aria-pressed={sel === i}
                className={`flex w-full items-center gap-3 border-2 px-3 py-2 text-left transition-all hover:translate-x-1 ${
                  sel === i ? "border-[var(--pip)] bg-[var(--pip-faint)]" : "pip-rule opacity-70 hover:opacity-100"
                }`}
              >
                <span className="font-display tabular text-2xl">{r.freq}</span>
                <span className="font-display text-xl tracking-widest">{r.name}</span>
                <span className="ml-auto text-sm tabular opacity-60">[{String(i + 1).padStart(2, "0")}]</span>
              </button>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-auto border-t pip-rule pt-4">
          <div className="relative h-3 border pip-rule">
            <div
              className="absolute top-[-6px] h-[20px] w-[3px] -translate-x-1/2 bg-[var(--pip)] transition-all"
              style={{ left: `${(sel / (RADIO.length - 1)) * 100}%` }}
            />
            {DIAL_TICKS.map((i) => (
              <span key={i} className="absolute top-0 h-full w-px bg-[var(--pip-dim)]" style={{ left: `${i * 12.5}%` }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs tracking-[0.2em] opacity-60">
            <span>88</span><span>92</span><span>96</span><span>100</span>
          </div>
        </div>
      </section>

      <section aria-label="Now playing" aria-live="polite" className="pip-panel pip-corners relative flex flex-col overflow-hidden p-6">
        <div key={st.freq} className="animate-screen-in-fast relative flex flex-1 flex-col justify-evenly">
          <Emblem aria-hidden="true" className="pointer-events-none absolute left-3/4 top-1/2 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-10 md:block" />
          <p className="text-sm tracking-[0.3em] opacity-70">
            {`NOW RECEIVING — ${st.freq} MHz`}
          </p>
          <p className="font-display mt-2 text-5xl tracking-wider pip-glow sm:text-6xl">{st.name}</p>
          <p className="font-display text-2xl opacity-80">{st.handle}</p>
          <p className="mt-4 max-w-2xl border-l-4 border-[var(--pip)] pl-3 font-display text-2xl leading-snug">
            {st.line}
          </p>
          <a
            href={st.link}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound && blip(1200, 0.09)}
            className="mt-6 inline-block self-start bg-[var(--pip)] px-6 py-2 font-display text-2xl tracking-widest text-black transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_var(--pip-dim)] active:scale-95"
          >
            OPEN SIGNAL <ArrowUpRight className="ml-2" />
          </a>
        </div>
        <p className="pt-4 text-xs tracking-[0.3em] opacity-50">
          TIP: EMAIL IS THE FASTEST FREQUENCY. CARAVANS WELCOME.
        </p>
      </section>
    </div>
  );
}
