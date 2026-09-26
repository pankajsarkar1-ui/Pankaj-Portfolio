"use client";

import { useState, useSyncExternalStore } from "react";
import { CoffeeLottie } from "@/components/CoffeeLottie";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

/**
 * Fixed trigger line, deliberately not the bar's own height: the bar shrinks
 * when it condenses, so measuring it would move the very threshold that decided
 * to condense, and the two could chase each other near the boundary.
 */
const CONDENSE_AT = 64;

/** Read straight off the scroll position — no state to fall out of step. */
const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
  };
};
const readCondensed = () => {
  const hero = document.getElementById("top");
  return hero ? hero.getBoundingClientRect().bottom <= CONDENSE_AT : false;
};
const condensedOnServer = () => false;

export function Nav() {
  const [open, setOpen] = useState(false);
  /** True once the hero has scrolled entirely behind the bar. */
  const condensed = useSyncExternalStore(
    subscribeScroll,
    readCondensed,
    condensedOnServer,
  );

  return (
    <nav className="sticky top-0 z-50">
      {/* Matches Column, so the bar sits exactly over the cards below it. */}
      <div className="mx-auto w-full max-w-[min(1190px,max(64vw,720px))] px-[16px] sm:px-[20px]">
        <div
          className={`rounded-t-[var(--radius-card)] border-x border-t border-b border-shell-border border-b-nav-border bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
            condensed
              ? "shadow-[0_10px_28px_-18px_rgba(0,0,0,0.35)]"
              : "shadow-none"
          }`}
        >
          <div
            className={`flex w-full items-center justify-between px-[16px] transition-[height] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:px-[32px] lg:px-[6.4%] ${
              condensed ? "h-[56px] sm:h-[68px]" : "h-[64px] sm:h-[112.673px]"
            }`}
          >
        <a href="#top" className="flex items-center text-ink">
          <Logo className="h-[20px] w-auto sm:h-[24px]" />
          <span className="sr-only">{site.name} — home</span>
        </a>

        <ul className="hidden gap-[48px] text-[15px] font-medium text-ink-nav md:flex">
          {site.nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-full px-[14px] py-[7px] transition-colors hover:bg-[#f0f0f0] hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[12px]">
          {/* The coffee plays on its own; the label unfurls on hover. The
              0fr -> 1fr grid track animates width without a magic max-width.
              Anek's font box is lopsided (15 up, 10 down) for Devanagari
              matras, so Latin ink rides ~0.19em above the centre of its line
              box — the nudge puts the text's ink on the pill's centre line. */}
          <a
            href="#contact"
            className="group flex items-center rounded-full border border-transparent py-[4px] pr-[4px] pl-[12px] transition-colors duration-300 hover:border-[#e6e6e6] hover:bg-[#f7f7f7]"
          >
            <CoffeeLottie className="size-[32px] shrink-0 sm:size-[38px]" />
            <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-cols-[1fr] motion-reduce:transition-none">
              <span className="overflow-hidden">
                <span className="block translate-y-[0.19em] pr-[12px] pl-[8px] text-[13px] leading-none font-medium whitespace-nowrap text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none sm:text-[15px]">
                  {site.ctaLabel}
                </span>
              </span>
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors hover:bg-[#f0f0f0] md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5.5h12M3 9h12M3 12.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 md:hidden">
          {/* Same column as the bar, so the panel hangs off its exact edges. */}
          <div className="mx-auto w-full max-w-[min(1190px,max(64vw,720px))] px-[16px] sm:px-[20px]">
            <ul className="flex flex-col rounded-b-[var(--radius-card)] border-x border-b border-shell-border bg-white px-[12px] py-[12px]">
            {site.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[12px] px-[12px] py-[10px] text-[15px] font-medium text-ink transition-colors hover:bg-[#f0f0f0]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
