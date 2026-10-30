import {
  IconHeart,
  IconMap,
  IconQuest,
  IconRadio,
  IconStar,
} from "@/components/icons";

export const TABS = [
  { id: "stat", label: "STAT", Icon: IconHeart },
  { id: "special", label: "S.P.E.C.I.A.L", Icon: IconStar },
  { id: "quests", label: "QUESTS", Icon: IconQuest },
  { id: "map", label: "MAP", Icon: IconMap },
  { id: "radio", label: "RADIO", Icon: IconRadio },
];

export const DEFAULT_TAB = "stat";

export const TAB_IDS = new Set(TABS.map((t) => t.id));

export function tabFromHash() {
  const id = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return TAB_IDS.has(id) ? id : DEFAULT_TAB;
}
