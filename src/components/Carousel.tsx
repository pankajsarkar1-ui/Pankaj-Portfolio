"use client";

/**
 * Horizontal scroller for the media rows. Native scrolling keeps trackpad,
 * shift+wheel and keyboard behaviour for free.
 *
 * `startInset` is the gap before the first card; the same value is added as
 * trailing padding so the last card can scroll clear of the right edge. The
 * track itself spans its parent's full width, so on the full-bleed AI section
 * the row runs edge to edge.
 */
export function Carousel({
  gap,
  startInset = 0,
  lgStartInset,
  ariaLabel,
  children,
}: {
  gap: number;
  startInset?: number;
  /** Optional wider inset from 1024px up, matching the Figma frame. */
  lgStartInset?: number;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={ariaLabel}
      style={
        {
          "--inset": `${startInset}px`,
          "--inset-lg": `${lgStartInset ?? startInset}px`,
        } as React.CSSProperties
      }
      className="no-scrollbar w-full overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--inset)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:px-[var(--inset-lg)]"
    >
      <div style={{ gap }} className="flex w-max items-start">
        {children}
      </div>
    </div>
  );
}
