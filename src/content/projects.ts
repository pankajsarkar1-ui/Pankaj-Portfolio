/**
 * The Selected Work section is three full-width banner cards (1000×437 in the
 * Figma frame). Geometry is kept in Figma pixels; BannerCard converts it to
 * percentages so a card scales as one piece at any width.
 */
export type BannerLayer = {
  src: string;
  /** Position/size relative to the 1000×437 card (Figma px). */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Baked-in rotation applied via CSS (deg). Stripes are upright PNGs rotated 30°. */
  rotate?: number;
  /** transform-origin x/y in % (defaults 0,0) — pivots rotation at the frame's corner. */
  originX?: number;
  originY?: number;
  /**
   * Hover translation in cqw units. For a rotated layer it is applied in the
   * rotated frame (translateY runs along the stripe's own axis).
   */
  move?: { x: number; y: number };
};

export type Project = {
  id: string;
  /** Title with explicit line breaks (rendered pre-line). */
  title: string;
  subtitle: string;
  readLabel: string;
  href: string;
  /** Natural card size in the Figma frame. */
  design: { w: number; h: number };
  theme: {
    /** Solid banner background. */
    bg: string;
    title: string;
    grid: string;
    pill: { bg: string; color: string };
    /** Progress slider: filled colour, position marker, and start icon. */
    timeline: {
      fill: string;
      marker: string;
      icon: "pin" | "sparkle" | "crown";
    };
  };
  layers: BannerLayer[];
  /** Plays over the illustration on hover. Box is in Figma px, like the layers. */
  animation?: {
    kind: "tracking" | "coins" | "levels";
    box: { x: number; y: number; w: number; h: number };
    hides: string[];
    /**
     * A single card lifted out of the stripe on hover, sitting exactly over its
     * baked position (render bounds, Figma px), that comes forward before the
     * live animation reveals — bridging the static → animated handoff.
     */
    lift?: { src: string; x: number; y: number; w: number; h: number };
  };
};

export const projects: Project[] = [
  {
    id: "order-tracking",
    title: "Live Order\nTracking",
    subtitle:
      "Track all your shipments from e-commerce sites and couriers in one place",
    readLabel: "4 min read →",
    href: "#",
    design: { w: 1000, h: 437 },
    theme: {
      bg: "#4354EE",
      title: "#96FF9A",
      grid: "rgba(255,255,255,0.16)",
      pill: { bg: "#F46868", color: "#FFFFFF" },
      timeline: { fill: "#96FF9A", marker: "#27457A", icon: "pin" },
    },
    // Two upright card stripes exported from Figma (transparent gaps), rotated
    // 30° in CSS and placed so their top-left maps to the Figma instance origin.
    // On hover they slide along their own axis — S1 (left) up, s2 (right) down.
    // s2 renders first (behind); S1 paints on top, matching Figma z-order.
    // S1's PNG has a 60px left margin, offset via originX so it pivots correctly.
    layers: [
      { src: "/assets/work/stripe-s2.png", x: 1348, y: -784, w: 263, h: 1454, rotate: 30, move: { x: 0, y: 22 } },
      { src: "/assets/work/stripe-s1.png", x: 752.17, y: -145, w: 350.67, h: 1477.9, rotate: 30, originX: 12.5, move: { x: 0, y: -22 } },
    ],
    // Timeline card lift/reveal is turned off for now. To re-enable, restore an
    // `animation: { kind: "tracking", box, hides, lift }` block (lift asset:
    // /assets/work/track-card-lift.png) and swap the stripes back to the baked
    // banner-track-cards*.png so the card sits over its rest position.
  },
  {
    id: "delhivery-coins",
    title: "Delhivery\nCoins",
    subtitle: "Score some shiny coins with every order you deliver",
    readLabel: "3 min read →",
    href: "#",
    design: { w: 1000, h: 438 },
    theme: {
      bg: "#FF6C6C",
      title: "#FFF375",
      grid: "rgba(255,255,255,0.18)",
      pill: { bg: "#000000", color: "#FFFFFF" },
      timeline: { fill: "#FFF375", marker: "#8A3A18", icon: "sparkle" },
    },
    layers: [
      { src: "/assets/work/banner-coins.png", x: 490.55, y: 100.87, w: 460.91, h: 301.53 },
    ],
    animation: {
      kind: "coins",
      box: { x: 470, y: 96, w: 470, h: 250 },
      hides: ["/assets/work/banner-coins.png"],
    },
  },
  {
    id: "refer-and-earn",
    title: "Refer & Earn",
    subtitle: "Tell your friends and family about us and start making some cash!",
    readLabel: "4 min read →",
    href: "#",
    design: { w: 1000, h: 438 },
    theme: {
      bg: "#7220BF",
      title: "#FF7779",
      grid: "rgba(255,255,255,0.16)",
      pill: { bg: "#FFF375", color: "#000000" },
      timeline: { fill: "#F46868", marker: "#7A1E10", icon: "crown" },
    },
    layers: [
      { src: "/assets/work/banner-refer.png", x: 500.23, y: 81, w: 419.77, h: 342.46 },
    ],
    animation: {
      kind: "levels",
      box: { x: 590, y: 96, w: 300, h: 314 },
      hides: ["/assets/work/banner-refer.png"],
    },
  },
];
