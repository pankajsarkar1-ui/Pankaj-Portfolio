import type { MediaCard } from "./aiExperiments";
import { aiExperiments } from "./aiExperiments";
import { beyondWork } from "./beyondWork";

/**
 * The Work page: one curated view and three disciplines. Selected reuses the
 * homepage banners; the rest are listed here. Visual Design and Experiments
 * draw on the same images as the homepage galleries, so there is one source.
 */

export type WorkTabId = "selected" | "product" | "visual" | "experiments";

export type ProductWork = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  /** A full case study; without one the card says it's on the way. */
  href?: string;
  read?: string;
  theme?: { bg: string; ink: string };
  /** Two bare 720×1600 screens, front then back. */
  screens?: [string, string];
};

export type WorkPiece = MediaCard & { tag: string };

const artist = beyondWork.tabs.find((t) => t.id === "artist-me")?.cards ?? [];
const proud = beyondWork.tabs.find((t) => t.id === "proud-me")?.cards ?? [];
const motion = beyondWork.tabs.find((t) => t.id === "me-in-motion")?.cards ?? [];
const ai = aiExperiments.tabs.find((t) => t.id === "experiments")?.cards ?? [];

/** What kind of piece each visual is, shown as its tag. */
const VISUAL_TAGS: Record<string, string> = {
  "mr-jextra": "Illustration",
  "comic-short-circuit": "Comic",
  "quick-sketch": "Sketch",
  "nayan-sukh-prapti": "Illustration",
  "mountain-sketches": "Sketch",
  bookmarks: "Bookmark design",
  "comic-thought-circuit": "Comic",
  "taking-action": "Illustration",
  "stamp-design": "Stamp design",
};

export const work = {
  title: "Work",
  headline: "Things I've shipped, sketched and played with.",
  intro:
    "Case studies from the Delhivery app, and the drawings, films and experiments I make on the side.",
  tabs: [
    { id: "selected", label: "Selected" },
    { id: "product", label: "Product Design" },
    { id: "visual", label: "Visual Design" },
    { id: "experiments", label: "Experiments" },
  ] as { id: WorkTabId; label: string }[],

  product: [
    {
      id: "order-tracking",
      title: "Live Order Tracking",
      blurb: "Track all your shipments from e-commerce sites and couriers in one place.",
      tags: ["Delhivery", "Case study"],
      href: "/work/order-tracking",
      read: "4 min read",
      theme: { bg: "#4354EE", ink: "#96FF9A" },
      screens: ["/assets/work/tracking/screen-on-the-way.png", "/assets/work/tracking/screen-placed.png"],
    },
    {
      id: "delhivery-coins",
      title: "Delhivery Coins",
      blurb: "Score some shiny coins with every order you deliver.",
      tags: ["Delhivery", "Case study"],
      href: "/work/delhivery-coins",
      read: "3 min read",
      theme: { bg: "#FF6C6C", ink: "#FFF375" },
      screens: ["/assets/work/coins/screens/hero-intro.png", "/assets/work/coins/screens/exp-track.png"],
    },
    {
      id: "refer-and-earn",
      title: "Refer & Earn",
      blurb: "Tell your friends and family about us and start making some cash.",
      tags: ["Delhivery", "Case study"],
      href: "/work/refer-and-earn",
      read: "4 min read",
      theme: { bg: "#7220BF", ink: "#FF7779" },
      screens: ["/assets/work/refer/screens/refer-page.png", "/assets/work/refer/screens/level-1.png"],
    },
    {
      id: "app-revamp",
      title: "Delhivery app revamp",
      blurb: "The whole app, rethought and rebuilt end to end.",
      tags: ["Delhivery"],
    },
    {
      id: "delhivery-local",
      title: "Delhivery Local",
      blurb: "Intracity delivery, designed from zero.",
      tags: ["Delhivery", "0 → 1"],
    },
    {
      id: "ptl",
      title: "PTL",
      blurb: "Send many boxes at once, for personal or business shipments.",
      tags: ["Delhivery", "0 → 1"],
    },
  ] satisfies ProductWork[],

  visual: [...artist, ...proud.filter((c) => c.id === "stamp-design")].map(
    (c): WorkPiece => ({ ...c, tag: VISUAL_TAGS[c.id] ?? "Illustration" }),
  ),

  experiments: {
    ai: ai.map((c): WorkPiece => ({ ...c, tag: "AI" })),
    motion: motion.map((c): WorkPiece => ({ ...c, tag: "Motion" })),
  },
};
