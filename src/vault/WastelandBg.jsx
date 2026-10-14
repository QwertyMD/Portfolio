import { useEffect, useState } from "react";

/**
 * Layered wasteland silhouette with mouse + scroll parallax.
 * Pure inline SVG (original art, no fetched assets) behind the terminal.
 */
export default function WastelandBg() {
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [sy, setSy] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => setSy(window.scrollY || 0);
    const loop = () => {
      setMx((v) => v + (tx - v) * 0.06);
      setMy((v) => v + (ty - v) * 0.06);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ink = "var(--pip)";
  const layer = (depth) => ({
    transform: `translate3d(${mx * depth * 22}px, ${
      my * depth * 12 + sy * depth * 0.06
    }px, 0)`,
    transition: "transform 0.1s linear",
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* sky glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 108%, var(--pip-faint), transparent 70%)",
        }}
      />
      {/* dying sun */}
      <div style={layer(0.3)} className="absolute inset-0">
        <svg viewBox="0 0 1440 800" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <circle cx="720" cy="620" r="150" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="2" />
          <circle cx="720" cy="620" r="110" fill="none" stroke={ink} strokeOpacity="0.2" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="520"
              y1={600 + i * 14}
              x2="920"
              y2={600 + i * 14}
              stroke={ink}
              strokeOpacity="0.25"
              strokeWidth="5"
            />
          ))}
        </svg>
      </div>
      {/* far ruins */}
      <div style={layer(0.55)} className="absolute inset-0">
        <svg viewBox="0 0 1440 800" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <g fill="var(--pip-bg)" stroke={ink} strokeOpacity="0.5" strokeWidth="2">
            <rect x="60" y="520" width="90" height="180" />
            <rect x="170" y="470" width="60" height="230" />
            <rect x="250" y="540" width="120" height="160" />
            <rect x="1050" y="500" width="80" height="200" />
            <rect x="1150" y="450" width="110" height="250" />
            <rect x="1280" y="540" width="90" height="160" />
            <polygon points="170,470 200,430 230,470" />
            <polygon points="1150,450 1205,400 1260,450" />
          </g>
          {/* broken overpass */}
          <g stroke={ink} strokeOpacity="0.45" strokeWidth="3" fill="none">
            <line x1="0" y1="560" x2="560" y2="540" />
            <line x1="880" y1="540" x2="1440" y2="560" />
            <line x1="300" y1="560" x2="300" y2="700" />
            <line x1="1140" y1="560" x2="1140" y2="700" />
          </g>
        </svg>
      </div>
      {/* near pylons + ground */}
      <div style={layer(1)} className="absolute inset-0">
        <svg viewBox="0 0 1440 800" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <g stroke={ink} strokeOpacity="0.7" strokeWidth="2.5" fill="none">
            <g transform="translate(220,0)">
              <line x1="0" y1="480" x2="0" y2="760" />
              <line x1="-60" y1="520" x2="60" y2="520" />
              <line x1="-45" y1="570" x2="45" y2="570" />
              <line x1="-60" y1="520" x2="0" y2="480" />
              <line x1="60" y1="520" x2="0" y2="480" />
            </g>
            <g transform="translate(1220,0)">
              <line x1="0" y1="500" x2="0" y2="760" />
              <line x1="-60" y1="540" x2="60" y2="540" />
              <line x1="-45" y1="590" x2="45" y2="590" />
            </g>
            {/* sagging wires */}
            <path d="M220,520 Q700,640 1220,540" strokeOpacity="0.5" />
            <path d="M220,570 Q700,690 1220,590" strokeOpacity="0.3" />
          </g>
          {/* ground hatch */}
          <g stroke={ink} strokeOpacity="0.35" strokeWidth="1.5">
            {Array.from({ length: 24 }, (_, i) => (
              <line key={i} x1={i * 65 - 40} y1="800" x2={i * 65 + 120} y2="700" />
            ))}
          </g>
          <line x1="0" y1="700" x2="1440" y2="700" stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
        </svg>
      </div>
      {/* film grain darkening so text stays readable */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
