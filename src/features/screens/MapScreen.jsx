import { useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { MAP_LOGS } from "@/data/mapLogs";
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
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[1fr_340px] lg:grid-rows-1">
      <section
        aria-label="Wasteland map"
        className="pip-panel pip-corners flex min-h-0 flex-col bg-[var(--pip-bg)] p-4 lg:h-full"
        onMouseMove={onHoverMove}
        onMouseLeave={resetTilt}
      >
        <h2 className="font-display text-3xl tracking-widest pip-glow">{"// SUNSARI WASTELAND"}</h2>
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
          <svg
            viewBox="0 0 100 78"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Stylized journey map"
            style={{ transform: `translate(${tilt.x * 14}px, ${tilt.y * 14}px)`, transition: "transform 0.3s ease-out" }}
          >
            <text x="50" y="6.5" textAnchor="middle" fill="var(--pip)" fontSize="3.6" opacity="0.6" fontFamily="'Share Tech Mono', monospace">
              {"N 26°39' — E 87°16' // SURVEY 2287"}
            </text>
            <polyline
              points={MAP_LOGS.map((m) => `${m.x},${m.y}`).join(" ")}
              fill="none"
              stroke="var(--pip)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <polyline
              points={MAP_LOGS.map((m) => `${m.x},${m.y}`).join(" ")}
              fill="none"
              stroke="var(--pip)"
              strokeOpacity="0.6"
              strokeWidth="0.8"
              strokeDasharray="4.5 3.5"
              className="route-flow"
            />
            <g style={{ transform: `translate(${tilt.x * 2.4}px, ${tilt.y * 2.4}px)`, transition: "transform 0.18s ease-out" }}>
              {MAP_LOGS.map((m, i) => {
                const active = i === sel;
                const anchor = i === 0 ? "start" : i === MAP_LOGS.length - 1 ? "end" : "middle";
                const lx = i === 0 ? 1.5 : i === MAP_LOGS.length - 1 ? 98.5 : m.x;
                return (
                  <g
                    key={m.id}
                    onClick={() => { setSel(i); if (sound) blip(700 + i * 60); }}
                    className="map-node cursor-pointer"
                  >
                    {active && (
                      <circle cx={m.x} cy={m.y} r={1.8} fill="none" stroke="var(--pip)" strokeWidth="0.7" className="pulse-ring" />
                    )}
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r={active ? 2.6 : 1.8}
                      fill={active ? "var(--pip)" : "var(--pip-bg)"}
                      stroke="var(--pip)"
                      strokeWidth="0.8"
                    />
                    <text
                      x={lx}
                      y={m.above ? m.y - 5.5 : m.y + 8}
                      textAnchor={anchor}
                      fill="var(--pip)"
                      fontSize="4.6"
                      fontFamily="VT323, monospace"
                      opacity={active ? 1 : 0.65}
                    >
                      {String(i + 1).padStart(2, "0")}.{m.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </section>

      <aside key={log.id} aria-label="Field log" aria-live="polite" className="animate-screen-in-fast pip-panel pip-corners flex flex-col p-5">
        <p className="text-xs tracking-[0.3em] opacity-70">{log.tag}</p>
        <p className="font-display mt-1 text-3xl tracking-widest pip-glow">{log.name}</p>
        <p className="mt-3 border-t pip-rule pt-3 text-[15px] leading-relaxed">{log.text}</p>
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={() => { const n = (sel + MAP_LOGS.length - 1) % MAP_LOGS.length; setSel(n); if (sound) blip(500); }}
            className="flex-1 border-2 pip-rule py-1 font-display text-xl tracking-widest hover:bg-[var(--pip-faint)]"
          >
            ◄
          </button>
          <button
            type="button"
            onClick={() => { const n = (sel + 1) % MAP_LOGS.length; setSel(n); if (sound) blip(800); }}
            className="flex-1 border-2 pip-rule py-1 font-display text-xl tracking-widest hover:bg-[var(--pip-faint)]"
          >
            ►
          </button>
        </div>
        <p className="tabular mt-3 text-center text-xs tracking-[0.3em] opacity-60">
          {String(sel + 1).padStart(2, "0")} / {String(MAP_LOGS.length).padStart(2, "0")}
        </p>
      </aside>
    </div>
  );
}
