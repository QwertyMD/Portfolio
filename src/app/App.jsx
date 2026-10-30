import { useEffect, useState } from "react";
import AccessDenied from "@/components/AccessDenied";
import DustCanvas from "@/components/DustCanvas";
import BootScreen from "@/features/boot/BootScreen";
import PipHeader from "@/features/header/PipHeader";
import MapScreen from "@/features/map/MapScreen";
import QuestsScreen from "@/features/quests/QuestsScreen";
import { QUESTS } from "@/features/quests/quests";
import RadioScreen from "@/features/radio/RadioScreen";
import { RADIO } from "@/features/radio/radio";
import CrtShell from "@/features/shell/CrtShell";
import useAccessDenied from "@/features/shell/useAccessDenied";
import useTabBurst from "@/features/shell/useTabBurst";
import SpecialScreen from "@/features/special/SpecialScreen";
import StatScreen from "@/features/stat/StatScreen";
import { PROFILE } from "@/features/stat/profile";
import PipTabs from "@/features/tabs/PipTabs";
import { DEFAULT_TAB } from "@/features/tabs/tabs";
import useHashTab from "@/features/tabs/useHashTab";
import usePipColor from "@/hooks/usePipColor";
import { pipHex } from "@/lib/colors";

const SCREENS = {
  stat: StatScreen,
  special: SpecialScreen,
  quests: QuestsScreen,
  map: MapScreen,
  radio: RadioScreen,
};

const TAB_COUNTS = {
  quests: QUESTS.length,
  radio: RADIO.length,
};

export default function App() {
  const [booted, setBooted] = useState(false);
  const [tab, selectTab] = useHashTab();
  const [pip, setPip] = usePipColor();
  const [sound, setSound] = useState(false);
  const { popup, show, dismiss } = useAccessDenied(sound);
  const { changeTab, bursting, burstTick } = useTabBurst(selectTab, tab);

  useEffect(() => {
    document.title = `${PROFILE.name} // ${tab.toUpperCase()} — VAULT-TEC TERMINAL`;
  }, [tab]);

  const Screen = SCREENS[tab] ?? SCREENS[DEFAULT_TAB];

  return (
    <>
      <CrtShell onContextMenu={show} onClick={dismiss}>
        {!booted ? (
          <BootScreen onDone={() => setBooted(true)} />
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col px-2 py-2 sm:px-3 sm:py-2.5">
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
                <DustCanvas color={pipHex(pip)} />
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <PipHeader pip={pip} onPipChange={setPip} sound={sound} onSoundChange={setSound} />
                  <PipTabs tab={tab} onTabChange={changeTab} sound={sound} counts={TAB_COUNTS} />
                  <main className="mt-4 min-h-0 flex-1 overflow-y-auto" role="tabpanel" aria-label={tab}>
                    <div key={tab} className="animate-screen-in h-full">
                      <Screen sound={sound} />
                    </div>
                  </main>
                </div>
              </div>
            </div>
            {/* Blackout covers full glass so the bezel ring never flashes as a seam. */}
            {bursting && (
              <div key={burstTick} aria-hidden="true" className="static-overlay pointer-events-none absolute inset-0 z-40" />
            )}
            <div key={pip} aria-hidden="true" className="flash-overlay pointer-events-none absolute inset-0 z-40" />
          </>
        )}
      </CrtShell>
      <AccessDenied popup={popup} />
    </>
  );
}
