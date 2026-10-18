export const TABS = [
  { id: "stat", label: "STAT" },
  { id: "special", label: "S.P.E.C.I.A.L" },
  { id: "quests", label: "QUESTS" },
  { id: "map", label: "MAP" },
  { id: "radio", label: "RADIO" },
];

export const DEFAULT_TAB = "stat";

export const TAB_IDS = new Set(TABS.map((t) => t.id));

export function tabFromHash() {
  const id = window.location.hash.replace("#", "").toLowerCase();
  return TAB_IDS.has(id) ? id : DEFAULT_TAB;
}
