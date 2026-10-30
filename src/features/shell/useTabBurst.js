import { useCallback, useEffect, useState } from "react";

const BURST_MS = 260;

export default function useTabBurst(selectTab, tab) {
  const [burstTick, setBurstTick] = useState(0);
  const bursting = burstTick > 0;

  useEffect(() => {
    if (!bursting) return undefined;
    const t = setTimeout(() => setBurstTick(0), BURST_MS);
    return () => clearTimeout(t);
  }, [bursting, burstTick]);

  const changeTab = useCallback(
    (id) => {
      if (id === tab) return;
      selectTab(id);
      setBurstTick((n) => n + 1);
    },
    [tab, selectTab]
  );

  return { changeTab, bursting, burstTick };
}
