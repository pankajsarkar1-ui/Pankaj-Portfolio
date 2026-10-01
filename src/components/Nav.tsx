"use client";

import { useState } from "react";
import { LottieMark } from "@/components/LottieMark";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="theme-surface relative border-b border-nav-border bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1190px] items-center justify-between px-[24px] sm:h-[112.673px] sm:px-[32px] lg:px-[6.4%]">
        {/* Logo and cup step aside while the mobile menu is open, leaving just
            the close control; they never move, so the X stays put. */}
        <a
          href="#top"
          aria-hidden={open ? true : undefined}
          tabIndex={open ? -1 : undefined}
          className={`flex items-center text-ink transition-opacity duration-200 md:opacity-100 ${
            open ? "pointer-events-none opacity-0 md:pointer-events-auto" : "opacity-100"
          }`}
        >
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
            aria-hidden={open ? true : undefined}
            tabIndex={open ? -1 : undefined}
            className={`group flex items-center rounded-full border border-transparent py-[4px] pr-[4px] pl-[12px] transition-[color,background-color,border-color,opacity] duration-300 hover:border-[#e6e6e6] hover:bg-[#f7f7f7] md:opacity-100 ${
              open ? "pointer-events-none opacity-0 md:pointer-events-auto" : "opacity-100"
            }`}
          >
            <LottieMark src="/assets/lottie/coffee.json" className="size-[27px] shrink-0 sm:size-[38px]" />
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
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors hover:bg-[#f0f0f0] md:hidden"
          >
            {/* Two bars that swing into an X — each rotates about its own centre
                and slides to the middle, so the change is one motion, not a
                swap. Two rungs, not three: the mark it sits beside is light. */}
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden>
              <line
                x1="3"
                y1="6.5"
                x2="15"
                y2="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="origin-center transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] [transform-box:fill-box] motion-reduce:transition-none"
                style={{ transform: open ? "translateY(2.5px) rotate(45deg)" : "none" }}
              />
              <line
                x1="3"
                y1="11.5"
                x2="15"
                y2="11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="origin-center transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] [transform-box:fill-box] motion-reduce:transition-none"
                style={{ transform: open ? "translateY(-2.5px) rotate(-45deg)" : "none" }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* The panel is always mounted so it can animate both ways: it grows from
          zero height as it fades in, and each link rises into place on a short
          stagger. */}
      <div
        aria-hidden={!open}
        className={`theme-surface absolute inset-x-0 top-full z-50 grid bg-white transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] md:hidden motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden border-b border-nav-border">
          <ul className="flex flex-col px-[16px] py-[12px]">
            {site.nav.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${90 + i * 55}ms` : "0ms" }}
                  className={`block rounded-[12px] px-[12px] py-[10px] text-[15px] font-medium text-ink transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-[#f0f0f0] motion-reduce:transition-none ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-[6px] opacity-0"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
