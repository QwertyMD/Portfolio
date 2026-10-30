import { MAP_LOGS } from "@/features/map/mapLogs";
import { blip } from "@/lib/audio";

export default function MapCanvas({ sel, onSelect, tilt, sound }) {
  const route = MAP_LOGS.map((m) => `${m.x},${m.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 100 78"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Stylized journey map"
      style={{
        transform: `translate(${tilt.x * 14}px, ${tilt.y * 14}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <text
        x="15.1"
        y="6.5"
        textAnchor="start"
        textLength="41.04"
        lengthAdjust="spacing"
        fill="var(--pip)"
        fontSize="3.6"
        opacity="0.6"
        fontFamily="'Share Tech Mono', monospace"
      >
        {"N 26°39' — E 87°16'"}
      </text>
      <path
        d="M57.74 7.35 59.54 3.75"
        stroke="var(--pip)"
        strokeOpacity="0.5"
        strokeWidth="0.45"
      />
      <text
        x="61.14"
        y="6.5"
        textAnchor="start"
        textLength="23.76"
        lengthAdjust="spacing"
        fill="var(--pip)"
        fontSize="3.6"
        opacity="0.6"
        fontFamily="'Share Tech Mono', monospace"
      >
        SURVEY 2287
      </text>
      <polyline points={route} fill="none" stroke="var(--pip)" strokeOpacity="0.3" strokeWidth="0.5" />
      <polyline
        points={route}
        fill="none"
        stroke="var(--pip)"
        strokeOpacity="0.6"
        strokeWidth="0.8"
        strokeDasharray="4.5 3.5"
        className="route-flow"
      />
      <g
        style={{
          transform: `translate(${tilt.x * 2.4}px, ${tilt.y * 2.4}px)`,
          transition: "transform 0.18s ease-out",
        }}
      >
        {MAP_LOGS.map((m, i) => {
          const active = i === sel;
          const last = i === MAP_LOGS.length - 1;
          const anchor = i === 0 ? "start" : last ? "end" : "middle";
          const lx = i === 0 ? 1.5 : last ? 98.5 : m.x;
          return (
            <g
              key={m.id}
              className="map-node cursor-pointer"
              onClick={() => {
                onSelect(i);
                if (sound) blip(700 + i * 60);
              }}
            >
              {active && (
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={1.8}
                  fill="none"
                  stroke="var(--pip)"
                  strokeWidth="0.7"
                  className="pulse-ring"
                />
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
  );
}
