import type { Project } from "@/content/projects";

/**
 * The "reading progress" slider beside each banner's read pill. Each card has
 * its own sequence in Figma — Order Tracking uses a location pin then dots,
 * Coins threads sparkles through the bar, Refer lines up crowns — and the
 * active run is two stripes (the themed fill, then a light remainder).
 */
const MUTED = "#E5E3E3";
const LAVENDER = "rgba(255,255,255,0.82)";

/**
 * Figma px → container-query width units, against the 1000px banner frame.
 * The card sets `container-type: inline-size`, so the run scales with it like
 * the rest of the artwork — fixed px here would crowd the illustration as the
 * card narrows.
 */
const u = (px: number) => `${px / 10}cqw`;

export function BannerTimeline({
  theme,
}: {
  theme: Project["theme"]["timeline"];
}) {
  const { fill, marker, icon } = theme;

  if (icon === "sparkle") {
    return (
      <Row>
        <Sparkle color={fill} />
        <Bar w={14} color={fill} />
        <Sparkle color={fill} />
        <ActiveTrack fill={fill} lead={30} rest={52} />
        <Sparkle color="rgba(255,255,255,0.5)" />
        <Bar w={14} color={MUTED} />
        <SquareDot color={MUTED} />
      </Row>
    );
  }

  if (icon === "crown") {
    return (
      <Row>
        <Crown color={fill} />
        <Bar w={14} color={fill} />
        <Crown color={fill} />
        <Bar w={14} color={fill} />
        <Crown color={fill} />
        <ActiveTrack fill={fill} lead={26} rest={48} />
        <SquareDot color="rgba(255,255,255,0.85)" />
      </Row>
    );
  }

  // pin (Order Tracking)
  return (
    <Row>
      <Pin ring={fill} core={marker} />
      <ActiveTrack fill={fill} lead={34} rest={58} marker={marker} />
      <Dot color={MUTED} size={8} />
      <Bar w={14} color={MUTED} />
      <Dot color={MUTED} size={8} />
      <Bar w={14} color={MUTED} />
      <SquareDot color={MUTED} />
    </Row>
  );
}

/**
 * Hidden below `md`. The read pill bottoms out at an 11px font and stops
 * scaling with the card, so on narrower cards the run is squeezed into the
 * illustration — and its bars render under 2px tall, which is clutter rather
 * than detail. The smallest card that still shows it clears by ~13px.
 */
function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden items-center md:flex" style={{ gap: u(7) }}>
      {children}
    </div>
  );
}

/** The themed fill stripe, an optional marker, then the lavender remainder. */
function ActiveTrack({
  fill,
  lead,
  rest,
  marker,
}: {
  fill: string;
  lead: number;
  rest: number;
  marker?: string;
}) {
  return (
    <span className="flex items-center" style={{ gap: u(3) }}>
      <span
        className="rounded-full"
        style={{ width: u(lead), height: u(5), background: fill }}
      />
      {marker ? (
        <span
          className="shrink-0 rounded-full"
          style={{ width: u(6), height: u(6), background: marker }}
        />
      ) : null}
      <span
        className="rounded-full"
        style={{ width: u(rest), height: u(5), background: LAVENDER }}
      />
    </span>
  );
}

function Bar({ w, color }: { w: number; color: string }) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{ width: u(w), height: u(5), background: color }}
    />
  );
}

function Dot({ color, size = 6 }: { color: string; size?: number }) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{ width: u(size), height: u(size), background: color }}
    />
  );
}

function SquareDot({ color, size = 7 }: { color: string; size?: number }) {
  return (
    <span
      className="shrink-0 rounded-[1.5px]"
      style={{ width: u(size), height: u(size), background: color }}
    />
  );
}

function Pin({ ring, core }: { ring: string; core: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className="shrink-0"
      style={{ width: u(12), height: u(12) }}
    >
      <circle cx="6" cy="6" r="6" fill={ring} />
      <circle cx="6" cy="6" r="2.4" fill={core} />
    </svg>
  );
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className="shrink-0"
      style={{ width: u(13), height: u(13) }}
    >
      <path
        d="M6 0c.4 2.9 2.7 5.2 6 5.6-3.3.4-5.6 2.7-6 6-.4-3.3-2.7-5.6-6-6C3.3 5.2 5.6 2.9 6 0Z"
        fill={color}
      />
    </svg>
  );
}

function Crown({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 20 18"
      aria-hidden
      className="shrink-0"
      style={{ width: u(15), height: u(13) }}
    >
      <path d="M2 6l4 4 4-7 4 7 4-4-1.6 9H3.6z" fill={color} />
      <rect x="4.4" y="16" width="11.2" height="1.9" rx="0.95" fill={color} />
    </svg>
  );
}
