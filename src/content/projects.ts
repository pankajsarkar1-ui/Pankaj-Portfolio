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
    href: "/work/order-tracking",
    design: { w: 1000, h: 437 },
    theme: {
      bg: "#4354EE",
      title: "#96FF9A",
      timeline: { fill: "#96FF9A", marker: "#27457A", icon: "pin" },
    },
    // Two upright card stripes exported from Figma (transparent gaps), rotated
    // 30° in CSS and placed so their top-left maps to the Figma instance origin.
    // On hover they slide along their own axis — S1 (left) up, s2 (right) down.
    // s2 renders first (behind); S1 paints on top, matching Figma z-order.
    // S1's PNG has a 60px left margin, offset via originX so it pivots correctly.
    layers: [
      { src: "/assets/work/stripe-s2.png", x: 1451.95, y: -724, w: 263, h: 1454, rotate: 30, move: { x: 0, y: 34 } },
      { src: "/assets/work/stripe-s1.png", x: 752.17, y: -145, w: 350.67, h: 1477.9, rotate: 30, originX: 12.5, move: { x: 0, y: -34 } },
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
      timeline: { fill: "#FFF375", marker: "#8A3A18", icon: "sparkle" },
    },
    // Coins has no baked static — CoinCardAnimation renders continuously (still
    // frame at rest, pointer parallax on hover), so there is no swap to smooth.
    layers: [],
    animation: {
      kind: "coins",
      // Card size; the component draws the front coin (hidden on hover) + rear coin.
      box: { x: 452, y: 86, w: 480, h: 288 },
      hides: [],
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
      timeline: { fill: "#FFF375", marker: "#7A1E10", icon: "crown" },
    },
    layers: [],
    animation: {
      kind: "levels",
      box: { x: 560, y: 70, w: 340, h: 314 },
      hides: [],
    },
  },
];
