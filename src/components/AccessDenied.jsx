import { WarnTriangle } from "@/components/icons";

export default function AccessDenied({ popup }) {
  if (!popup) return null;

  return (
    <div
      key={popup.id}
      aria-live="polite"
      className="animate-screen-in-fast pip-panel pip-corners fixed z-50 w-[300px] bg-[var(--pip-bg)] p-4"
      style={{ left: popup.x, top: popup.y }}
    >
      <p className="font-display text-2xl tracking-widest text-[var(--pip)] pip-glow">
        <WarnTriangle className="mr-2" />
        {popup.msg[0]} {popup.msg[1]}
      </p>
      <p className="mt-2 text-xs tracking-[0.3em] opacity-60">
        THIS INCIDENT WILL BE REPORTED
      </p>
    </div>
  );
}
