"use client";

import { useEffect, useState } from "react";

/**
 * A floating way back up, shown only while the footer is on screen. The two
 * chevrons climb in turn, so it reads as "up" before it's read at all.
 */
export function BackToTop({ watch }: { watch: React.RefObject<HTMLElement | null> }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = watch.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [watch]);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? undefined : -1}
      aria-hidden={!shown}
      className={`group fixed right-[16px] bottom-[16px] z-40 flex size-[52px] items-center justify-center rounded-full bg-ink text-white ring-1 ring-white/20 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:right-[28px] sm:bottom-[28px] sm:size-[58px] ${
        shown ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-[16px] scale-90 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-[22px] overflow-visible sm:size-[24px]">
        {[
          { d: "M6 13l6-6 6 6", delay: "0ms" },
          { d: "M6 19l6-6 6 6", delay: "180ms" },
        ].map((c) => (
          <path
            key={c.d}
            d={c.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: c.delay }}
            className="[animation:chevronClimb_1.4s_cubic-bezier(.45,0,.25,1)_infinite] motion-reduce:[animation:none]"
          />
        ))}
      </svg>
    </button>
  );
}
