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
        ⚠ {popup.msg}
      </p>
      <p className="mt-2 text-[11px] tracking-[0.3em] opacity-60">
        THIS INCIDENT WILL BE REPORTED
      </p>
    </div>
  );
}

export const DENIED_MESSAGE = "ACCESS DENIED // VAULT-TEC SECURITY";
