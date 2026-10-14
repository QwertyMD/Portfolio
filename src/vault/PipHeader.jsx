import { useEffect, useState } from "react";
import { blip } from "./sound";
const COLORS = [
  { id: "green", hex: "#33ff66", label: "GREEN" },
  { id: "amber", hex: "#ffb000", label: "AMBER" },
  { id: "blue", hex: "#8df5ff", label: "BLUE" },
  { id: "white", hex: "#e8f5d6", label: "WHITE" },
];

function Trefoil() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true" fill="currentColor">
      <circle cx="20" cy="23" r="5" />
      {[0, 120, 240].map((r) => (
        <path
          key={r}
          d="M20 4 A13 13 0 0 1 31 27 L20 27 Z"
          transform={`rotate(${r} 20 22)`}
          opacity="0.9"
        />
      ))}
      <circle cx="20" cy="22" r="17" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default function PipHeader({ pip, setPip, sound, setSound }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <header className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b-2 pip-rule pb-3">
      <div className="flex items-center gap-3">
        <Trefoil />
        <p className="font-display text-3xl tracking-wider pip-glow">VAULT-TEC</p>
      </div>

      <div className="min-w-[240px] flex-1 leading-tight">
        <p className="font-display text-3xl tracking-[0.12em] pip-glow sm:text-4xl">
          WELCOME! <span className="opacity-60">//</span> VAULT 404
        </p>
        <p className="mt-1 text-xs tracking-[0.3em] opacity-70">
          <span className="tabular">{clock}</span> {"//"} 10.14.2287 {"//"} SIG ▂▄▆█ {"//"} ITAHARI WASTELAND
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Phosphor color">
          {COLORS.map((c) => (
            <button
              key={c.id}
              title={c.label}
              aria-label={`${c.label} phosphor`}
              aria-pressed={pip === c.id}
              onClick={() => {
                setPip(c.id);
                if (sound) blip(c.id === "green" ? 880 : c.id === "amber" ? 660 : 990);
              }}
              className="h-5 w-5 border-2 transition-transform hover:scale-125 hover:shadow-[0_0_10px_currentColor]"
              style={{
                background: pip === c.id ? c.hex : "transparent",
                borderColor: c.hex,
                boxShadow: pip === c.id ? `0 0 10px ${c.hex}` : "none",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => {
            const next = !sound;
            setSound(next);
            if (next) blip(880, 0.09);
          }}
          aria-pressed={sound}
          className="border-2 pip-rule px-3 py-1 text-xs tracking-[0.25em] transition-colors hover:bg-[var(--pip-faint)]"
        >
          {"♪"} SOUND:{sound ? "ON" : "OFF"}
        </button>
      </div>
    </header>
  );
}
