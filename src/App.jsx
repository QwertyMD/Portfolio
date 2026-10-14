import { useCallback, useEffect, useRef, useState } from "react";
import Boot from "./vault/Boot";
import PipHeader from "./vault/PipHeader";
import PipTabs from "./vault/PipTabs";
import WastelandBg from "./vault/WastelandBg";
import DustCanvas from "./vault/DustCanvas";
import StatScreen from "./vault/screens/StatScreen";
import SpecialScreen from "./vault/screens/SpecialScreen";
import QuestsScreen from "./vault/screens/QuestsScreen";
import MapScreen from "./vault/screens/MapScreen";
import RadioScreen from "./vault/screens/RadioScreen";
import { TABS } from "./vault/data";
import { blip } from "./vault/sound";

const PIP_HEX = { green: "#33ff66", amber: "#ffb000", blue: "#8df5ff", white: "#e8f5d6" };
const VALID = new Set(TABS.map((t) => t.id));

function tabFromHash() {
  const h = window.location.hash.replace("#", "").toLowerCase();
  return VALID.has(h) ? h : "stat";
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [tab, setTab] = useState(tabFromHash);
  const [pip, setPip] = useState(() => localStorage.getItem("pip-color") || "green");
  const [sound, setSound] = useState(false);
  const [burst, setBurst] = useState(0);
  const [rc, setRc] = useState(null);
  const rcTimer = useRef(null);

  const DENIED = "ACCESS DENIED // VAULT-TEC SECURITY";

  const onContextMenu = (e) => {
    e.preventDefault();
    if (sound) blip(150, 0.15, "sawtooth", 0.05);
    clearTimeout(rcTimer.current);
    setRc({
      x: Math.max(8, Math.min(e.clientX, window.innerWidth - 330)),
      y: Math.max(8, Math.min(e.clientY, window.innerHeight - 150)),
      msg: DENIED,
      id: Date.now(),
    });
    rcTimer.current = setTimeout(() => setRc(null), 2200);
  };

  const finishBoot = useCallback(() => setBooted(true), []);

  useEffect(() => {
    document.documentElement.dataset.pip = pip;
    localStorage.setItem("pip-color", pip);
  }, [pip]);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const changeTab = (id) => {
    if (id === tab) return;
    setTab(id);
    setBurst((b) => b + 1);
    setTimeout(() => setBurst(0), 260);
    if (window.location.hash !== `#${id}`) window.location.hash = id;
  };

  useEffect(() => {
    document.title = `AARYAN DHKAL // ${tab.toUpperCase()} — VAULT-TEC TERMINAL`;
  }, [tab]);

  if (!booted)
    return (
      <div className="min-h-screen" onContextMenu={onContextMenu} onClick={() => setRc(null)}>
        <Boot onDone={finishBoot} />
        {rc && (
          <div
            key={rc.id}
            aria-live="polite"
            className="animate-screen-in-fast pip-panel pip-corners fixed z-50 w-[300px] bg-[var(--pip-bg)] p-4"
            style={{ left: rc.x, top: rc.y }}
          >
            <p className="font-display text-2xl tracking-widest text-[var(--pip)] pip-glow">⚠ {rc.msg}</p>
            <p className="mt-2 text-[11px] tracking-[0.3em] opacity-60">THIS INCIDENT WILL BE REPORTED</p>
          </div>
        )}
      </div>
    );

  return (
    <div className="min-h-screen" onContextMenu={onContextMenu} onClick={() => setRc(null)}>
      <WastelandBg />
      <div className="crt crt-vignette flex h-dvh flex-col overflow-hidden animate-pip-flicker px-2 py-2 sm:px-3 sm:py-2">
        <div className="pip-panel pip-corners relative flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6">
          <DustCanvas color={PIP_HEX[pip] ?? PIP_HEX.green} />
          {burst > 0 && (
            <div key={burst} aria-hidden="true" className="static-overlay pointer-events-none absolute inset-0 z-20" />
          )}
          <div key={pip} aria-hidden="true" className="flash-overlay pointer-events-none absolute inset-0 z-20" />
          <div className="relative flex min-h-0 flex-1 flex-col">
            <PipHeader pip={pip} setPip={setPip} sound={sound} setSound={setSound} />
            <PipTabs tab={tab} setTab={changeTab} sound={sound} />
            <main className="mt-4 min-h-0 flex-1 overflow-y-auto" role="tabpanel" aria-label={tab}>
              <div key={tab} className="animate-screen-in h-full">
              {tab === "stat" && <StatScreen />}
              {tab === "special" && <SpecialScreen sound={sound} />}
              {tab === "quests" && <QuestsScreen sound={sound} />}
              {tab === "map" && <MapScreen sound={sound} />}
              {tab === "radio" && <RadioScreen sound={sound} />}
              </div>
            </main>
          </div>
        </div>
      </div>
      {rc && (
        <div
          key={rc.id}
          aria-live="polite"
          className="animate-screen-in-fast pip-panel pip-corners fixed z-50 w-[300px] bg-[var(--pip-bg)] p-4"
          style={{ left: rc.x, top: rc.y }}
        >
          <p className="font-display text-2xl tracking-widest text-[var(--pip)] pip-glow">⚠ {rc.msg}</p>
          <p className="mt-2 text-[11px] tracking-[0.3em] opacity-60">THIS INCIDENT WILL BE REPORTED</p>
        </div>
      )}
    </div>
  );
}
