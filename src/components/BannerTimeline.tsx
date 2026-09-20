import type { Project } from "@/content/projects";

/**
 * The "reading progress" slider beside each banner's read pill. Each card has
 * its own sequence in Figma — Order Tracking uses a location pin then dots,
 * Coins threads sparkles through the bar, Refer lines up crowns — and the
 * active run is two stripes (the themed fill, then a light remainder).
 */
const MUTED = "#E5E3E3";
const LAVENDER = "rgba(255,255,255,0.82)";

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
        <ActiveTrack fill={fill} lead={30} rest={78} />
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
        <ActiveTrack fill={fill} lead={26} rest={70} />
        <SquareDot color="rgba(255,255,255,0.85)" />
      </Row>
    );
  }

  // pin (Order Tracking)
  return (
    <Row>
      <Pin ring={fill} core={marker} />
      <ActiveTrack fill={fill} lead={34} rest={84} marker={marker} />
      <Dot color={MUTED} size={8} />
      <Bar w={14} color={MUTED} />
      <Dot color={MUTED} size={8} />
      <Bar w={14} color={MUTED} />
      <SquareDot color={MUTED} />
    </Row>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-[7px]">{children}</div>;
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
    <span className="flex items-center gap-[3px]">
      <span
        className="h-[5px] rounded-full"
        style={{ width: lead, background: fill }}
      />
      {marker ? (
        <span
          className="size-[6px] shrink-0 rounded-full"
          style={{ background: marker }}
        />
      ) : null}
      <span
        className="h-[5px] rounded-full"
        style={{ width: rest, background: LAVENDER }}
      />
    </span>
  );
}

function Bar({ w, color }: { w: number; color: string }) {
  return (
    <span
      className="h-[5px] rounded-full"
      style={{ width: w, background: color }}
    />
  );
}

function Dot({ color, size = 6 }: { color: string; size?: number }) {
  return (
    <span
      className="rounded-full"
      style={{ width: size, height: size, background: color }}
    />
  );
}

function SquareDot({ color, size = 7 }: { color: string; size?: number }) {
  return (
    <span
      className="rounded-[1.5px]"
      style={{ width: size, height: size, background: color }}
    />
  );
}

function Pin({ ring, core }: { ring: string; core: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <circle cx="6" cy="6" r="6" fill={ring} />
      <circle cx="6" cy="6" r="2.4" fill={core} />
    </svg>
  );
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden>
      <path
        d="M6 0c.4 2.9 2.7 5.2 6 5.6-3.3.4-5.6 2.7-6 6-.4-3.3-2.7-5.6-6-6C3.3 5.2 5.6 2.9 6 0Z"
        fill={color}
      />
    </svg>
  );
}

function Crown({ color }: { color: string }) {
  return (
    <svg width="15" height="13" viewBox="0 0 20 18" aria-hidden>
      <path d="M2 6l4 4 4-7 4 7 4-4-1.6 9H3.6z" fill={color} />
      <rect x="4.4" y="16" width="11.2" height="1.9" rx="0.95" fill={color} />
    </svg>
  );
}
