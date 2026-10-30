import { Caret } from "@/components/icons";

const BTN =
  "flex-1 border-2 pip-rule py-1 font-display text-xl tracking-widest hover:bg-[var(--pip-faint)]";

export default function ScreenNav({ onPrev, onNext, labeled = false }) {
  return (
    <div className="mt-auto flex gap-2 pt-4">
      <button type="button" onClick={onPrev} className={BTN} aria-label="Previous">
        <Caret className="rotate-180" />
        {labeled ? " PREV" : null}
      </button>
      <button type="button" onClick={onNext} className={BTN} aria-label="Next">
        {labeled ? "NEXT " : null}
        <Caret />
      </button>
    </div>
  );
}
