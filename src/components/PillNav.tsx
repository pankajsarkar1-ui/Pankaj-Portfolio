"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import { LottieMark } from "@/components/LottieMark";
import { site } from "@/content/site";

/**
 * The compact nav that takes over once the hero has scrolled away. The bar in
 * the hero card stays where it is and scrolls off with it; this is a separate,
 * narrower pill that carries just the section links.
 */

/** Shown once the hero's last pixel has left the viewport. */
const readPastHero = () => {
  const hero = document.getElementById("top");
  return hero ? hero.getBoundingClientRect().bottom <= 0 : false;
};
const pastHeroOnServer = () => false;

/** Read straight off the scroll position, so it cannot fall out of step. */
const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
  };
};

export function PillNav() {
  const shown = useSyncExternalStore(
    subscribeScroll,
    readPastHero,
    pastHeroOnServer,
  );

  return (
    <div
      className={`fixed inset-x-0 top-[12px] z-50 flex justify-center transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:top-[18px] ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-[12px] opacity-0"
      }`}
      // Out of the way of assistive tech until it is actually on screen.
      aria-hidden={!shown}
    >
      {/* Opaque rather than translucent: it floats over the dark sections, and
          a see-through fill picks their colour up through it. */}
      <nav
        aria-label="Sections"
        className="flex items-center rounded-full border border-shell-border bg-white py-[5px] pr-[5px] pl-[6px] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.30)]"
      >
        {/* the mark, home */}
        <Link
          href="/#top"
          tabIndex={shown ? undefined : -1}
          className="flex items-center rounded-full py-[7px] pr-[8px] pl-[12px] text-ink transition-opacity hover:opacity-70"
        >
          <Logo still className="h-[16px] w-auto sm:h-[18px]" />
          <span className="sr-only">{site.name} — home</span>
        </Link>
        <span aria-hidden className="mx-[4px] h-[18px] w-px bg-shell-border" />

        <ul className="flex items-center gap-[2px]">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                tabIndex={shown ? undefined : -1}
                className="block rounded-full px-[14px] py-[7px] text-[14px] font-medium text-ink-nav transition-colors hover:bg-[#f0f0f0] hover:text-ink sm:px-[18px] sm:text-[15px]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <span aria-hidden className="mx-[6px] h-[18px] w-px bg-shell-border" />

        {/* The cup plays on its own; "Let's talk" unfurls to its left on hover.
            The 0fr -> 1fr grid track animates width with no magic max-width,
            and it opens inward from the pill's right edge rather than pushing
            past its rounded corner. */}
        <a
          href="#contact"
          aria-label={site.contact.eyebrow}
          tabIndex={shown ? undefined : -1}
          className="group flex items-center rounded-full p-[3px] pr-[4px] transition-colors hover:bg-[#f0f0f0]"
        >
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-cols-[1fr] motion-reduce:transition-none">
            <span className="overflow-hidden">
              <span className="block pr-[8px] pl-[10px] text-[14px] leading-none font-medium whitespace-nowrap text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none sm:text-[15px]">
                {site.ctaLabel}
              </span>
            </span>
          </span>
          <LottieMark src="/assets/lottie/coffee.json" className="size-[24px] shrink-0 sm:size-[26px]" />
        </a>
      </nav>
    </div>
  );
}
