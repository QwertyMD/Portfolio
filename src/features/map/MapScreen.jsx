import { useState } from "react";
import ScreenNav from "@/components/ScreenNav";
import { IconMap, Slash } from "@/components/icons";
import MapCanvas from "@/features/map/MapCanvas";
import { MAP_LOGS } from "@/features/map/mapLogs";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { blip } from "@/lib/audio";

export default function MapScreen({ sound }) {
  const reduced = usePrefersReducedMotion();
  const [sel, setSel] = useState(MAP_LOGS.length - 1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const log = MAP_LOGS[sel];

  const onHoverMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[1fr_340px] lg:grid-rows-1">
      <section
        aria-label="Wasteland map"
        className="pip-panel pip-corners flex min-h-0 flex-col bg-[var(--pip-bg)] p-4 lg:h-full"
        onMouseMove={onHoverMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <h2 className="font-display flex items-center gap-2 text-3xl tracking-widest pip-glow">
          <IconMap />
          WASTELAND
        </h2>
        <div
          className="relative mt-2 min-h-[320px] min-w-0 flex-1 bg-[var(--pip-bg)] lg:min-h-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--pip-faint) 1px, transparent 1px), linear-gradient(90deg, var(--pip-faint) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: `${tilt.x * 20}px ${tilt.y * 20}px`,
            transition: "background-position 0.3s ease-out",
          }}
        >
          <span aria-hidden="true" className="absolute left-1 top-1 h-4 w-4 border-l-4 border-t-4 border-[var(--pip)] opacity-70" />
          <span aria-hidden="true" className="absolute right-1 top-1 h-4 w-4 border-r-4 border-t-4 border-[var(--pip)] opacity-70" />
          <span aria-hidden="true" className="absolute bottom-1 left-1 h-4 w-4 border-b-4 border-l-4 border-[var(--pip)] opacity-70" />
          <span aria-hidden="true" className="absolute bottom-1 right-1 h-4 w-4 border-b-4 border-r-4 border-[var(--pip)] opacity-70" />
          <MapCanvas sel={sel} onSelect={setSel} tilt={tilt} sound={sound} />
        </div>
      </section>

      <aside
        key={log.id}
        aria-label="Field log"
        aria-live="polite"
        className="animate-screen-in-fast pip-panel pip-corners flex flex-col p-5"
      >
        <p className="text-sm tracking-[0.3em] opacity-70">{log.tag}</p>
        <p className="font-display mt-1 text-3xl tracking-widest pip-glow">{log.name}</p>
        <p className="mt-3 border-t pip-rule pt-3 text-base leading-relaxed">{log.text}</p>
        <ScreenNav
          onPrev={() => {
            setSel((sel + MAP_LOGS.length - 1) % MAP_LOGS.length);
            if (sound) blip(500);
          }}
          onNext={() => {
            setSel((sel + 1) % MAP_LOGS.length);
            if (sound) blip(800);
          }}
        />
        <p className="tabular mt-3 text-center text-sm tracking-[0.3em] opacity-60">
          <span className="inline-flex items-center gap-2">
            {String(sel + 1).padStart(2, "0")}
            <Slash className="opacity-70" />
            {String(MAP_LOGS.length).padStart(2, "0")}
          </span>
        </p>
      </aside>
    </div>
  );
}
