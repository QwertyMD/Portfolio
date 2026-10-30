export default function Meter({ value = 0, total = 10, className = "" }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-[0.12em] ${className}`.trim()}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-[0.85em] w-[0.5em] ${
            i < value ? "bg-current" : "border border-current opacity-30"
          }`}
        />
      ))}
    </span>
  );
}
