"use client";

import { useEffect, useRef, useState } from "react";

export type CaseSection = { id: string; label: string };

/**
 * Horizontal section rail for a case study. Sits in the flow under the hero and
 * sticks to the top of the viewport on scroll. Tracks the section nearest an
 * anchor line a third down the viewport, so short sections between tall ones
 * still take the highlight. The active chip is kept scrolled into view so the
 * rail stays useful once it overflows on narrow screens.
 */
export function CaseNav({ sections }: { sections: readonly CaseSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
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
      aria-label="Case study sections"
      className="sticky top-0 z-30 -mx-[16px] border-b border-[#ececec] bg-white/85 backdrop-blur-md sm:-mx-[20px]"
    >
      <ul
        ref={railRef}
        className="flex gap-[2px] overflow-x-auto px-[12px] [scrollbar-width:none] sm:px-[16px] [&::-webkit-scrollbar]:hidden"
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
                className={`font-mono relative block px-[12px] py-[15px] text-[12px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                  on ? "text-accent" : "text-ink-muted hover:text-ink"
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
