import { useCallback, useEffect, useRef, useState } from "react";
import AccessDenied, { DENIED_MESSAGE } from "@/components/AccessDenied";
import DustCanvas from "@/components/DustCanvas";
import WastelandBg from "@/components/WastelandBg";
import BootScreen from "@/features/boot/BootScreen";
import PipHeader from "@/features/header/PipHeader";
import PipTabs from "@/features/tabs/PipTabs";
import MapScreen from "@/features/screens/MapScreen";
import QuestsScreen from "@/features/screens/QuestsScreen";
import RadioScreen from "@/features/screens/RadioScreen";
import SpecialScreen from "@/features/screens/SpecialScreen";
import StatScreen from "@/features/screens/StatScreen";
import { PROFILE } from "@/data/profile";
import useHashTab from "@/hooks/useHashTab";
import usePipColor from "@/hooks/usePipColor";
import { blip } from "@/lib/audio";
import { pipHex } from "@/lib/colors";
import { DEFAULT_TAB } from "@/lib/tabs";

const SCREENS = {
  stat: StatScreen,
  special: SpecialScreen,
  quests: QuestsScreen,
  map: MapScreen,
  radio: RadioScreen,
};

const DENIED_DURATION = 2200;
const BURST_DURATION = 260;
const DENIED_POPUP_MARGIN = 8;
const DENIED_POPUP_RIGHT = 330;
const DENIED_POPUP_BOTTOM = 150;

export default function App() {
  const [booted, setBooted] = useState(false);
  const [tab, selectTab] = useHashTab();
  const [pip, setPip] = usePipColor();
  const [sound, setSound] = useState(false);
  const [denied, setDenied] = useState(null);
  const [burstTick, setBurstTick] = useState(0);
  const deniedTimer = useRef(null);

  const showDenied = useCallback(
    (e) => {
      e.preventDefault();
      if (sound) blip(150, 0.15, "sawtooth", 0.05);
      clearTimeout(deniedTimer.current);
      setDenied({
        x: Math.max(DENIED_POPUP_MARGIN, Math.min(e.clientX, window.innerWidth - DENIED_POPUP_RIGHT)),
        y: Math.max(DENIED_POPUP_MARGIN, Math.min(e.clientY, window.innerHeight - DENIED_POPUP_BOTTOM)),
        msg: DENIED_MESSAGE,
        id: Date.now(),
      });
      deniedTimer.current = setTimeout(() => setDenied(null), DENIED_DURATION);
    },
    [sound]
  );

  const dismissDenied = useCallback(() => setDenied(null), []);

  useEffect(() => () => clearTimeout(deniedTimer.current), []);

  useEffect(() => {
    document.title = `${PROFILE.name} // ${tab.toUpperCase()} — VAULT-TEC TERMINAL`;
  }, [tab]);

  const changeTab = useCallback(
    (id) => {
      if (id === tab) return;
      selectTab(id);
      setBurstTick((b) => b + 1);
    },
    [tab, selectTab]
  );

  const burstVisible = burstTick > 0;

  useEffect(() => {
    if (!burstVisible) return undefined;
    const t = setTimeout(() => setBurstTick(0), BURST_DURATION);
    return () => clearTimeout(t);
  }, [burstVisible]);

  const Screen = SCREENS[tab] ?? SCREENS[DEFAULT_TAB];

  return (
    <div className="min-h-screen" onContextMenu={showDenied} onClick={dismissDenied}>
      <WastelandBg />
      {!booted ? (
        <BootScreen onDone={() => setBooted(true)} />
      ) : (
        <div className="crt crt-vignette flex h-dvh animate-pip-flicker flex-col overflow-hidden px-2 py-2 sm:px-3 sm:py-2">
          <div className="pip-panel pip-corners relative flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6">
            <DustCanvas color={pipHex(pip)} />
            {burstVisible && (
              <div key={burstTick} aria-hidden="true" className="static-overlay pointer-events-none absolute inset-0 z-20" />
            )}
            <div key={pip} aria-hidden="true" className="flash-overlay pointer-events-none absolute inset-0 z-20" />
            <div className="relative flex min-h-0 flex-1 flex-col">
              <PipHeader pip={pip} onPipChange={setPip} sound={sound} onSoundChange={setSound} />
              <PipTabs tab={tab} onTabChange={changeTab} sound={sound} />
              <main className="mt-4 min-h-0 flex-1 overflow-y-auto" role="tabpanel" aria-label={tab}>
                <div key={tab} className="animate-screen-in h-full">
                  <Screen sound={sound} />
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
      <AccessDenied popup={denied} />
    </div>
  );
}
