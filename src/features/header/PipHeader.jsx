import { useEffect, useState } from "react";
import { MusicNote } from "@/components/icons";
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
    <header className="relative flex flex-wrap items-center gap-x-8 gap-y-3 border-b-2 pip-rule pb-3">
      <VaultTecLogo className="h-14 w-[84px] sm:hidden" />

      <div className="min-w-[240px] flex-1 leading-tight">
        <p className="font-display text-3xl tracking-[0.12em] pip-glow sm:text-4xl">WELCOME!</p>
        <p className="font-display mt-1 text-2xl tracking-[0.25em] pip-glow-soft sm:text-3xl">
          {formatClock(now)}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="grid grid-cols-3 gap-x-2 gap-y-1.5" role="group" aria-label="Phosphor color">
          {PIP_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              title={c.label}
              aria-label={`${c.label} phosphor`}
              aria-pressed={pip === c.id}
              onClick={() => {
                onPipChange(c.id);
                if (sound) blip(c.blip);
              }}
              className="h-6 w-6 border-2 transition-transform hover:scale-125 hover:shadow-[0_0_10px_currentColor]"
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
          className="border-2 pip-rule px-4 py-1.5 text-sm tracking-[0.2em] transition-colors hover:bg-[var(--pip-faint)]"
        >
          <MusicNote className="mr-1.5" />SOUND:{sound ? "ON" : "OFF"}
        </button>
      </div>

      <VaultTecLogo
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-16 w-[96px] -translate-x-1/2 -translate-y-1/2 sm:block"
      />
    </header>
  );
}
