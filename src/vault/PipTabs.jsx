import { TABS, QUESTS, RADIO } from "./data";
import { blip } from "./sound";

const COUNTS = { quests: QUESTS.length, radio: RADIO.length };

export default function PipTabs({ tab, setTab, sound }) {
  const order = TABS.map((t) => t.id);

  const go = (id) => {
    if (id === tab) return;
    setTab(id);
    if (sound) blip(720 + order.indexOf(id) * 90);
  };

  return (
    <nav aria-label="Pip-Boy tabs" className="mt-4">
      <ul className="flex flex-wrap gap-2" role="tablist">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <li key={t.id}>
              <button
                role="tab"
                aria-selected={active}
                onClick={() => go(t.id)}
                className={`font-display px-4 py-1 text-xl tracking-widest transition-colors sm:text-2xl hover:shadow-[0_0_14px_var(--pip-faint)] ${
                  active
                    ? "bg-[var(--pip)] text-black pip-glow-soft"
                    : "text-[var(--pip)] opacity-70 hover:opacity-100 hover:bg-[var(--pip-faint)]"
                } border-2 pip-rule`}
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
