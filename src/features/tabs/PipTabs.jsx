import { QUESTS } from "@/data/quests";
import { RADIO } from "@/data/radio";
import { TABS } from "@/lib/tabs";
import { blip } from "@/lib/audio";

const COUNTS = { quests: QUESTS.length, radio: RADIO.length };
const TAB_ORDER = TABS.map((t) => t.id);

export default function PipTabs({ tab, onTabChange, sound }) {
  const go = (id) => {
    if (id === tab) return;
    onTabChange(id);
    if (sound) blip(720 + TAB_ORDER.indexOf(id) * 90);
  };

  return (
    <nav aria-label="Pip-Boy tabs" className="mt-4">
      <ul className="flex flex-wrap gap-2" role="tablist">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => go(t.id)}
                className={`font-display border-2 pip-rule px-4 py-1 text-xl tracking-widest transition-colors sm:text-2xl hover:shadow-[0_0_14px_var(--pip-faint)] ${
                  active
                    ? "bg-[var(--pip)] text-black pip-glow-soft"
                    : "text-[var(--pip)] opacity-70 hover:opacity-100 hover:bg-[var(--pip-faint)]"
                }`}
              >
                {active ? "[ " : "  "}
                {t.label}
                {COUNTS[t.id] ? ` (${COUNTS[t.id]})` : ""}
                {active ? " ]" : "  "}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 border-b-2 pip-rule" />
    </nav>
  );
}
