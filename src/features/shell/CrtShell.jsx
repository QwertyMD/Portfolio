export default function CrtShell({ children, onContextMenu, onClick }) {
  return (
    <div
      className="fixed inset-0 p-1.5 sm:p-3"
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      <div className="crt-bezel relative flex h-full w-full">
        <span aria-hidden="true" className="crt-screw crt-screw-tl" />
        <span aria-hidden="true" className="crt-screw crt-screw-tr" />
        <span aria-hidden="true" className="crt-screw crt-screw-bl" />
        <span aria-hidden="true" className="crt-screw crt-screw-br" />
        <div className="crt crt-screen crt-vignette animate-pip-flicker relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
          <div aria-hidden="true" className="crt-flare pointer-events-none absolute inset-0 z-30" />
          <div aria-hidden="true" className="crt-roll pointer-events-none absolute inset-x-0 z-30" />
        </div>
      </div>
    </div>
  );
}
