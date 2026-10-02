import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";
import { Icon } from "./CaseIcons";

/**
 * The building blocks every case study shares: the page column, the section
 * heading, the full-colour band and the hero card's top bar. Colour comes from
 * the theme tokens, so a page re-themes them all by overriding `--color-accent`
 * (and friends) on its own root.
 */

export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1190px] px-[16px] sm:px-[20px]">{children}</div>;
}

export function Heading({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[28px] leading-[1.04] font-bold tracking-[-0.03em] text-balance sm:text-[48px] ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** A full-colour slab. Blue carries the banner's perspective floor, as the
 *  project card on the homepage does; cream is the warm paper of a sketchbook.
 *  `plain` leaves the colour to the caller's `className`, for a page's own
 *  palette; `floor` adds the perspective grid to any tone; `roomy` widens the
 *  padding for bands that hold a lot. */
export function Band({
  tone,
  floor,
  roomy = false,
  children,
  className = "",
}: {
  tone: "blue" | "black" | "cream" | "plain";
  floor?: boolean;
  roomy?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    tone === "blue" ? "bg-accent" : tone === "black" ? "bg-ink" : tone === "cream" ? "bg-accent-soft" : "";
  const pad = roomy ? "p-[24px] sm:p-[56px] lg:p-[72px]" : "p-[22px] sm:p-[48px]";
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${pad} ${bg} ${className}`}>
      {(floor ?? tone === "blue") ? (
        /* eslint-disable-next-line @next/next/no-img-element -- decorative, sized to the band */
        <img
          src="/assets/work/grid.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

/** A row that swipes on phones and settles into a grid from `lg`. */
export const STRIP =
  "-mx-[16px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none] sm:-mx-[20px] sm:px-[20px] lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden";
/** The same strip inside a roomy band, bleeding to the band's own edge. */
export const BAND_STRIP =
  "-mx-[24px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[24px] pb-[8px] [scrollbar-width:none] sm:-mx-[56px] sm:px-[56px] lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden";

/** A section's opening paragraph; `ink` for coloured surfaces, `light` for dark. */
export function Lede({ children, tone = "body" }: { children: React.ReactNode; tone?: "body" | "ink" | "light" }) {
  const color = tone === "light" ? "text-white/80" : tone === "ink" ? "text-ink" : "text-ink-body";
  return <p className={`max-w-[58ch] text-[16px] leading-[1.6] sm:text-[18px] ${color}`}>{children}</p>;
}

/** Heading and its lede, with more air above the content than between them. */
export function Intro({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-[16px] sm:gap-[24px]">{children}</div>;
}

/** The hero card's top bar: the way back on the left, the mark on the right. */
export function CaseHeroNav() {
  return (
    /* gutters track the hero copy below, so the mark lines up with the title */
    <nav className="flex items-center justify-between border-b border-nav-border px-[16px] py-[16px] sm:px-[48px] sm:py-[22px]">
      <Link
        href="/#work"
        className="-ml-[6px] flex items-center gap-[8px] rounded-full px-[14px] py-[8px] text-[13px] font-medium text-ink-nav transition-colors hover:bg-chip-idle hover:text-ink"
      >
        <Icon name="arrow" className="size-[16px] rotate-180" />
        All work
      </Link>
      <Link href="/" className="flex items-center text-ink">
        <Logo className="h-[20px] w-auto sm:h-[24px]" />
        <span className="sr-only">{site.name} — home</span>
      </Link>
    </nav>
  );
}
