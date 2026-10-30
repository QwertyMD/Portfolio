function Svg({ viewBox = "0 0 12 12", className = "", children, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-hidden="true"
      className={`ic ${className}`.trim()}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Caret(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <path d="M2 1.6 10.4 6 2 10.4Z" />
    </Svg>
  );
}

export function Chevron(props) {
  return (
    <Svg {...props}>
      <path
        d="M2.4 1.4 7 6l-4.6 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </Svg>
  );
}

export function Dot(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <circle cx="6" cy="6" r="2" />
    </Svg>
  );
}

export function Slash(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <path d="M7.6 .8h2.2L4.4 11.2H2.2L7.6 .8Z" />
    </Svg>
  );
}

export function DoubleSlash(props) {
  return (
    <Svg viewBox="0 0 14 12" fill="currentColor" {...props}>
      <path d="M6.1 .8h2.2L2.9 11.2H.7L6.1 .8Z" />
      <path d="M11.6 .8h2.2L8.4 11.2H6.2L11.6 .8Z" />
    </Svg>
  );
}

export function ArrowUpRight(props) {
  return (
    <Svg {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M1.6 10.4 9 3" />
        <path d="M3.6 2.4h6.6V9" />
      </g>
    </Svg>
  );
}

export function Diamond(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <path d="M6 .9 11.1 6 6 11.1 .9 6 6 .9Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5 8.5 6 6 8.5 3.5 6 6 3.5Z" />
    </Svg>
  );
}

export function Plus(props) {
  return (
    <Svg {...props}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
        <path d="M6 2v8" />
        <path d="M2 6h8" />
      </g>
    </Svg>
  );
}

export function MusicNote(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <rect x="7.9" y="0.8" width="1.5" height="8.4" rx="0.5" />
      <path d="M9.4 .8c1.7.5 2.8 1.6 2.4 3.2-.4-1-1.2-1.7-2.4-2V.8Z" />
      <ellipse cx="6.9" cy="9.8" rx="2.5" ry="1.9" />
    </Svg>
  );
}

export function WarnTriangle(props) {
  return (
    <Svg {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M6 1.4 11 10.4H1L6 1.4Z" />
        <path d="M6 4.4V7" />
      </g>
      <circle cx="6" cy="8.9" r="0.95" fill="currentColor" />
    </Svg>
  );
}

export function IconHeart(props) {
  return (
    <Svg {...props}>
      <path
        d="M6 10.8C2.5 8.6 1.1 6.4 1.1 4.4c0-1.7 1.3-3 2.9-3 .8 0 1.6.4 2 1 .4-.6 1.2-1 2-1 1.6 0 2.9 1.3 2.9 3 0 2-1.4 4.2-4.9 6.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </Svg>
  );
}

export function IconStar(props) {
  return (
    <Svg {...props}>
      <path
        d="M6 1.1l1.5 3.1 3.4.5-2.4 2.4.5 3.4L6 8.9 3 10.5l.5-3.4L1.1 4.7l3.4-.5L6 1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconQuest(props) {
  return (
    <Svg {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2.2" y="1.6" width="7.6" height="9" />
        <path d="M4.4 4.4h3.2M4.4 6.6h3.2M4.4 8.8h2" />
      </g>
      <rect x="4.4" y="0.6" width="3.2" height="1.8" fill="currentColor" />
    </Svg>
  );
}

export function IconMap(props) {
  return (
    <Svg {...props}>
      <path
        d="M6 10.9c-2.3-3-3.3-4.8-3.3-6.4a3.3 3.3 0 0 1 6.6 0c0 1.6-1 3.4-3.3 6.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6" cy="4.5" r="1.2" fill="currentColor" />
    </Svg>
  );
}

export function IconRadio(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="1.4" fill="currentColor" />
      <path d="M3.9 8.1a2.2 2.2 0 0 0 0-4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.1 8.1a2.2 2.2 0 0 1 0-4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </Svg>
  );
}
