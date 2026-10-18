import { useCallback, useEffect, useState } from "react";
import { TAB_IDS, tabFromHash } from "@/lib/tabs";

export default function useHashTab() {
  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    const onHashChange = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectTab = useCallback((id) => {
    if (!TAB_IDS.has(id)) return;
    if (window.location.hash !== `#${id}`) window.location.hash = id;
    setTab(id);
  }, []);

  return [tab, selectTab];
}
