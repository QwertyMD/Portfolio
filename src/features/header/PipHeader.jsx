import { useEffect, useState } from "react";
import VaultTecLogo from "@/components/VaultTecLogo";
import { blip } from "@/lib/audio";
import { PIP_COLORS } from "@/lib/colors";

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatClock(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function PipHeader({ pip, onPipChange, sound, onSoundChange }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b-2 pip-rule pb-3">
      <VaultTecLogo className="h-12 w-[72px] sm:h-14 sm:w-[84px]" />

      <div className="min-w-[240px] flex-1 leading-tight">
        <p className="font-display text-3xl tracking-[0.12em] pip-glow sm:text-4xl">
          WELCOME! <span className="opacity-60">{"//"}</span> VAULT 404
        </p>
        <p className="mt-1 text-xs tracking-[0.3em] opacity-70">
          <span className="tabular">{formatClock(now)}</span> {"//"} 10.14.2287 {"//"} SIG ▂▄▆█ {"//"} ITAHARI WASTELAND
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Phosphor color">
          {PIP_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              title={c.label}
              aria-label={`${c.label} phosphor`}
              aria-pressed={pip === c.id}
              onClick={() => {
                onPipChange(c.id);
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
          type="button"
          onClick={() => {
            const next = !sound;
            onSoundChange(next);
            if (next) blip(880, 0.09);
          }}
          aria-pressed={sound}
          className="border-2 pip-rule px-3 py-1 text-xs tracking-[0.25em] transition-colors hover:bg-[var(--pip-faint)]"
        >
          ♪ SOUND:{sound ? "ON" : "OFF"}
        </button>
      </div>
    </header>
  );
}
