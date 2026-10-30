import { TABS } from "@/features/tabs/tabs";
import { blip } from "@/lib/audio";

export default function PipTabs({ tab, onTabChange, sound, counts = {} }) {
  const go = (id) => {
    if (id === tab) return;
    onTabChange(id);
    if (sound) blip(720 + TABS.findIndex((t) => t.id === id) * 90);
  };

  return (
    <nav aria-label="Pip-Boy tabs" className="mt-4">
      <ul className="flex flex-wrap gap-2" role="tablist">
        {TABS.map((t) => {
          const active = tab === t.id;
          const Icon = t.Icon;
          const count = counts[t.id];
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                role="tab"
                aria-selected={active}
                onClick={(e) => {
                  e.preventDefault();
                  go(t.id);
                }}
                className={`font-display flex items-center gap-2 border-2 pip-rule px-4 py-1.5 text-2xl tracking-widest transition-colors sm:px-5 sm:text-2xl hover:shadow-[0_0_14px_var(--pip-faint)] ${
                  active
                    ? "bg-[var(--pip)] text-black pip-glow-soft"
                    : "text-[var(--pip)] opacity-70 hover:opacity-100 hover:bg-[var(--pip-faint)]"
                }`}
              >
                <Icon className={active ? "" : "opacity-60"} />
                <span className="leading-none">{t.label}</span>
                {count ? <span className="leading-none opacity-60">({count})</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 border-b-2 pip-rule" />
    </nav>
  );
}
