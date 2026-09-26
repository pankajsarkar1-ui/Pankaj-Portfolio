"use client";

import { useState } from "react";
import { CoffeeLottie } from "@/components/CoffeeLottie";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative border-b border-nav-border bg-white">
      <div className="mx-auto flex h-[64px] w-full max-w-[1190px] items-center justify-between px-[16px] sm:h-[112.673px] sm:px-[20px]">
        <a href="#top" className="ml-[10px] flex items-center text-ink sm:ml-[12px]">
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
              0fr -> 1fr grid track animates width without a magic max-width. */}
          <a
            href="#contact"
            className="group flex items-center rounded-full border border-transparent py-[4px] pr-[4px] pl-[4px] transition-colors duration-300 hover:border-[#e6e6e6] hover:bg-[#f7f7f7]"
          >
            <CoffeeLottie className="size-[32px] shrink-0 sm:size-[38px]" />
            <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-cols-[1fr] motion-reduce:transition-none">
              <span className="overflow-hidden">
                <span className="block pr-[12px] pl-[8px] text-[13px] leading-none font-medium whitespace-nowrap text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none sm:text-[15px]">
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
