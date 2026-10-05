"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import { LottieMark } from "@/components/LottieMark";
import { site } from "@/content/site";

/**
 * The compact nav that the hero's bar turns into. The moment the hero card's
 * top edge reaches the top of the viewport, this takes the bar's place pixel
 * for pixel (same width, height, corners and item positions), and the bar in
 * the card goes blank underneath. Over the next stretch of scroll it shrinks
 * into the floating pill: the sides draw in, the corners round off, the links
 * close up, the logo and cup scale down and the dividers and shadow come in.
 * Scroll back and it unwinds the same way, handing back to the bar at the top.
 *
 * The morph is driven by scroll position, with the drawn state gliding a
 * beat behind it, so it can't run ahead of the page but never jumps with a
 * wheel step either. One number, --p (0 = the hero bar, 1 = the pill), drives it: the
 * nav's box is written per frame in px, and the items inside read --p in calc.
 */

const ease = (t: number) => t * t * (3 - 2 * t);

/** The hero's bar, which carries `data-hero-nav`; its parent is the card. */
const heroBar = () => document.querySelector<HTMLElement>("[data-hero-nav]");

/** Docked once the card's top edge has reached the top of the viewport. */
const readDocked = () => {
  const card = heroBar()?.parentElement;
  return card ? card.getBoundingClientRect().top < 0 : true;
};
const dockedOnServer = () => false;

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("scroll", cb);
    window.removeEventListener("resize", cb);
  };
};

/** The pill's own padding, left and right, once compact. */
const PAD_L = 18;
const PAD_R = 5;
/** How softly the drawn morph trails the scroll, in ms. */
const TAU = 140;

export function PillNav() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLElement>(null);
  /** For assistive tech and the tab order only; the look is written below. */
  const shown = useSyncExternalStore(subscribeScroll, readDocked, dockedOnServer);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pill = pillRef.current;
    if (!wrap || !pill) return;
    const bar = heroBar();
    const card = bar?.parentElement ?? null;

    /** Where it starts (the hero bar) and ends (the pill). */
    const m = { w0: 0, h0: 0, pl0: PAD_L, pr0: PAD_R, r0: 0, x0: 0, w1: 0, h1: 0, top1: 18, run: 120 };

    const measure = () => {
      // the compact size: let it lay itself out at p = 1
      wrap.style.setProperty("--p", "1");
      Object.assign(pill.style, {
        width: "",
        height: "",
        paddingLeft: `${PAD_L}px`,
        paddingRight: `${PAD_R}px`,
        transform: "",
      });
      m.w1 = pill.offsetWidth;
      m.h1 = pill.offsetHeight;
      m.top1 = window.innerWidth >= 640 ? 18 : 12;
      if (!bar || !card) return;

      // the full size: the card's outer box, with the bar's content edges
      const c = card.getBoundingClientRect();
      const row = bar.firstElementChild as HTMLElement;
      const r = row.getBoundingClientRect();
      const rs = getComputedStyle(row);
      const cs = getComputedStyle(card);
      const edge = parseFloat(cs.borderTopWidth) || 0;
      const w = wrap.getBoundingClientRect();
      m.w0 = c.width;
      m.h0 = bar.offsetHeight + edge;
      m.pl0 = r.left + parseFloat(rs.paddingLeft) - c.left - edge;
      m.pr0 = c.right - (r.right - parseFloat(rs.paddingRight)) - edge;
      m.r0 = parseFloat(cs.borderTopLeftRadius) || 0;
      m.x0 = c.left + c.width / 2 - (w.left + w.width / 2);
      // the morph runs over about twice the bar's own height
      m.run = bar.offsetHeight * 2;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /** The morph as drawn. It glides after the scroll rather than jumping
     *  with it, so a wheel's coarse steps still read as one fluid motion. */
    let p = -1;
    let last = 0;
    let raf = 0;
    const update = (now: number) => {
      raf = 0;
      const top = card ? card.getBoundingClientRect().top : -Infinity;
      const target = card ? ease(Math.min(1, Math.max(0, -top / m.run))) : 1;
      // exponential follow, the same feel at any frame rate
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      if (p < 0 || reduce) p = target;
      else p += (target - p) * (1 - Math.exp(-dt / TAU));
      if (Math.abs(target - p) < 0.0005) p = target;
      else raf = requestAnimationFrame(update);
      if (!raf) last = 0;

      // the pill holds the stage until it has fully unwound onto the bar
      const docked = top < 0 || p > 0;
      if (bar) bar.dataset.docked = String(docked);
      wrap.style.visibility = docked ? "visible" : "hidden";

      const q = 1 - p;
      wrap.style.setProperty("--p", p.toFixed(4));
      const end = m.h1 / 2;
      const rt = m.r0 * q + end * p;
      const rb = end * p;
      Object.assign(pill.style, {
        width: `${m.w0 * q + m.w1 * p}px`,
        height: `${m.h0 * q + m.h1 * p}px`,
        paddingLeft: `${m.pl0 * q + PAD_L * p}px`,
        paddingRight: `${m.pr0 * q + PAD_R * p}px`,
        borderRadius: `${rt}px ${rt}px ${rb}px ${rb}px`,
        // while unwinding it rides down with the card, so it lands on the bar
        transform: `translate(${m.x0 * q}px, ${Math.max(0, top) * q + m.top1 * p}px)`,
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      cancelAnimationFrame(raf);
      raf = 0;
      p = -1;
      update(performance.now());
    };

    onResize();
    // the compact width depends on the webfont
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (bar) delete bar.dataset.docked;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="invisible fixed inset-x-0 top-0 z-50 flex justify-center [--p:1]"
      // Out of the way of assistive tech until it is actually on screen.
      aria-hidden={!shown}
    >
      {/* Opaque rather than translucent: it floats over the dark sections, and
          a see-through fill picks their colour up through it. */}
      <nav
        ref={pillRef}
        aria-label="Sections"
        className="flex items-center justify-between overflow-hidden border border-shell-border bg-white py-[5px] whitespace-nowrap shadow-[0_8px_24px_-12px_rgba(0,0,0,calc(0.3*var(--p)))]"
      >
        {/* the mark, home; its divider grows in as the pill closes up */}
        <div className="flex items-center">
          <Link
            href="/#top"
            tabIndex={shown ? undefined : -1}
            className="flex items-center rounded-full py-[7px] pr-[calc(8px*var(--p))] text-ink transition-opacity hover:opacity-70"
          >
            <Logo still className="h-[calc(16px+4px*(1-var(--p)))] w-auto sm:h-[calc(18px+6px*(1-var(--p)))]" />
            <span className="sr-only">{site.name} — home</span>
          </Link>
          <span aria-hidden className="mx-[calc(4px*var(--p))] h-[18px] w-[calc(1px*var(--p))] bg-shell-border" />
        </div>

        {/* Spaced like the hero bar's links at first, then drawn together.
            Phones show no links in the hero, so there they open up late. */}
        <ul className="flex items-center gap-[2px] max-md:max-w-[calc(320px*var(--p))] max-md:overflow-hidden max-md:opacity-[clamp(0,calc(var(--p)*2.5-1.5),1)] md:gap-[calc(2px+38px*(1-var(--p)))]">
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

        <div className="flex items-center">
          <span aria-hidden className="mx-[calc(6px*var(--p))] h-[18px] w-[calc(1px*var(--p))] bg-shell-border" />

          {/* The cup plays on its own; "Let's talk" unfurls to its left on
              hover. The 0fr -> 1fr grid track animates width with no magic
              max-width, and it opens inward from the pill's right edge rather
              than pushing past its rounded corner. */}
          <a
            href="#contact"
            aria-label={site.contact.eyebrow}
            tabIndex={shown ? undefined : -1}
            className="group flex items-center rounded-full border border-transparent py-[2px] pr-[calc(3px+1px*(1-var(--p)))] pl-[calc(2px+10px*(1-var(--p)))] transition-colors hover:bg-[#f0f0f0]"
          >
            <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-cols-[1fr] motion-reduce:transition-none">
              <span className="overflow-hidden">
                <span className="block pr-[8px] pl-[10px] text-[14px] leading-none font-medium whitespace-nowrap text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none sm:text-[15px]">
                  {site.ctaLabel}
                </span>
              </span>
            </span>
            <LottieMark
              src="/assets/lottie/coffee.json"
              className="size-[calc(24px+3px*(1-var(--p)))] shrink-0 sm:size-[calc(26px+12px*(1-var(--p)))]"
            />
          </a>

          {/* On phones the hero bar ends in a menu button; it folds away. */}
          <span
            aria-hidden
            className="ml-[calc(12px*(1-var(--p)))] flex h-[36px] w-[calc(36px*(1-var(--p)))] items-center justify-center overflow-hidden text-ink opacity-[clamp(0,calc(1-var(--p)*2.5),1)] md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" className="shrink-0">
              <line x1="3" y1="6.5" x2="15" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="11.5" x2="15" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </nav>
    </div>
  );
}
