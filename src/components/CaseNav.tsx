"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./case/CaseIcons";

export type CaseSection = { id: string; label: string };

/**
 * Horizontal section rail for a case study. Sits in the flow under the hero and
 * sticks to the top of the viewport on scroll. Tracks the section nearest an
 * anchor line a third down the viewport, so short sections between tall ones
 * still take the highlight. The active chip is kept scrolled into view so the
 * rail stays useful once it overflows on narrow screens.
 *
 * Once the rail is stuck to the top — the point where the hero's own "All work"
 * button has scrolled away — a back CTA unfurls at its left so the way out is
 * never more than a glance away.
 */
export function CaseNav({ sections }: { sections: readonly CaseSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.33;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
      // Stuck once the sticky rail has pinned to the top of the viewport.
      const nav = navRef.current;
      if (nav) setStuck(nav.getBoundingClientRect().top <= 0.5);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [sections]);

  // Keep the active chip visible within the horizontal scroller.
  useEffect(() => {
    const rail = railRef.current;
    const item = itemRefs.current[active];
    if (!rail || !item) return;
    const r = rail.getBoundingClientRect();
    const i = item.getBoundingClientRect();
    if (i.left < r.left + 16 || i.right > r.right - 16) {
      rail.scrollTo({
        left: rail.scrollLeft + (i.left - r.left) - 20,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Case study sections"
      className="sticky top-0 z-30 -mx-[16px] flex items-stretch border-b border-[#ececec] bg-white/85 backdrop-blur-md sm:-mx-[20px]"
    >
      {/* Back out — unfurls from 0 width once the rail is stuck, so the tabs
          sit undisturbed until the hero's own back button is out of reach. */}
      <div
        className={`grid shrink-0 transition-[grid-template-columns] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          stuck ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Link
            href="/work"
            aria-hidden={!stuck}
            tabIndex={stuck ? undefined : -1}
            className={`flex h-full items-center gap-[8px] pr-[14px] pl-[16px] text-[15px] font-medium whitespace-nowrap text-ink-nav transition-opacity duration-300 hover:text-ink sm:pl-[20px] sm:text-[16px] ${
              stuck ? "opacity-100" : "opacity-0"
            }`}
          >
            <Icon name="arrow" className="size-[17px] rotate-180" />
            All work
          </Link>
        </div>
      </div>

      {/* Divider between the back CTA and the tabs, shown with the CTA. */}
      <span
        aria-hidden
        className={`my-auto h-[22px] w-px shrink-0 bg-[#e6e6e6] transition-opacity duration-300 ${
          stuck ? "opacity-100" : "opacity-0"
        }`}
      />

      <ul
        ref={railRef}
        className="flex min-w-0 flex-1 gap-[10px] overflow-x-auto px-[12px] [scrollbar-width:none] sm:gap-[16px] sm:px-[16px] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                ref={(el) => {
                  itemRefs.current[s.id] = el;
                }}
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={`font-sans relative block px-[12px] py-[24px] text-[15px] transition-colors duration-200 sm:text-[16px] ${
                  on ? "font-semibold text-accent" : "font-normal text-ink-body hover:text-ink"
                }`}
              >
                {s.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-[12px] bottom-0 h-[2px] origin-left rounded-full transition-transform duration-300 ${
                    on ? "scale-x-100 bg-accent" : "scale-x-0 bg-transparent"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
