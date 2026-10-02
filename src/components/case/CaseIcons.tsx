/**
 * The case study's icon set: one 24px grid, one stroke weight, round joins,
 * so every glyph on the page reads as the same hand.
 */

const PATHS = {
  parcel: (
    <>
      <path d="M12 3 4 7v10l8 4 8-4V7z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="M3 9.2h18" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.4" />
      <path d="M11 17.6h2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h6.5a3.5 3.5 0 0 0 0-7h-5a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  delay: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  lost: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
      <path d="M8.8 8.9a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1M10.5 13.7v.1" />
    </>
  ),
  weight: (
    <>
      <path d="M9 7.5a3 3 0 0 1 6 0" />
      <path d="M6.6 9.5h10.8l1.9 10H4.7z" />
    </>
  ),
  payment: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.2" />
      <path d="M3 10.2h18M7 14.6h3.5" />
    </>
  ),
  returns: (
    <>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </>
  ),
  refunds: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.6 9.3c-.5-.8-1.4-1.3-2.6-1.3-1.4 0-2.5.8-2.5 2s1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.2 0-2.1-.5-2.6-1.3M12 6.6V8M12 16v1.4" />
    </>
  ),
  reattempt: (
    <>
      <path d="M19.5 11A7.5 7.5 0 0 0 6.2 6.6L4.5 8.3" />
      <path d="M4.5 4.5v3.8h3.8" />
      <path d="M4.5 13a7.5 7.5 0 0 0 13.3 4.4l1.7-1.7" />
      <path d="M19.5 19.5v-3.8h-3.8" />
    </>
  ),
  otp: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.4v2.2" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17.5 5-4.5 3.5 3 3-2.5 4.5 4" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.2 8.8v6.4l5.2-3.2z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  cross: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className = "size-[20px]",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {PATHS[name]}
    </svg>
  );
}
