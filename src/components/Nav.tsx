"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative border-b border-nav-border bg-white">
      <div className="mx-auto flex h-[64px] w-full max-w-[1190px] items-center justify-between px-[16px] sm:h-[112.673px] sm:px-[20px]">
        <a href="#top" className="flex items-baseline gap-[9.796px]">
          <span className="size-[13px] shrink-0 self-center rounded-full bg-ink" />
          <span className="text-[17.633px] font-bold leading-none text-ink">
            {site.initials}
          </span>
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
          <a
            href="#contact"
            className="flex items-center rounded-full border-[1.469px] border-ink bg-ink px-[12px] py-[6px] text-[13px] leading-none text-white transition-colors hover:bg-[#1a1a1a] sm:px-[15.673px] sm:py-[7.837px] sm:text-[15px]"
          >
            {site.ctaLabel}
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

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 border-b border-nav-border bg-white md:hidden">
          <ul className="flex flex-col px-[16px] py-[12px]">
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
      ) : null}
    </nav>
  );
}
