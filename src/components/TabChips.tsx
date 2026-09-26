"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  /** Optional glyph shown before the label; inherits the chip's text colour. */
  icon?: React.ReactNode;
};

export function TabChips({
  tabs,
  activeId,
  onChange,
  tone = "light",
  size = "md",
  ariaLabel,
}: {
  tabs: readonly Tab[];
  activeId: string;
  onChange: (id: string) => void;
  /** On the dark AI backdrop the active/idle fills swap. */
  tone?: "light" | "dark";
  /** `lg` is the oversized picker used in the contact footer. */
  size?: "md" | "lg";
  ariaLabel: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const btn = btnRefs.current[activeId];
      const list = listRef.current;
      if (!btn || !list) return;
      const b = btn.getBoundingClientRect();
      const l = list.getBoundingClientRect();
      setPill({
        left: b.left - l.left,
        top: b.top - l.top,
        width: b.width,
        height: b.height,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [activeId, tabs]);

  const pillSkin = tone === "dark" ? "bg-chip-idle" : "bg-ink";

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`relative flex flex-wrap ${
        size === "lg" ? "gap-[10px] sm:gap-[14px]" : "gap-[8px] sm:gap-[10.827px]"
      }`}
    >
      {pill ? (
        <span
          aria-hidden
          className={`pointer-events-none absolute top-0 left-0 rounded-full ${pillSkin} transition-[transform,width,height] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none`}
          style={{
            transform: `translate(${pill.left}px, ${pill.top}px)`,
            width: pill.width,
            height: pill.height,
          }}
        />
      ) : null}

      {tabs.map((tab) => {
        const active = tab.id === activeId;
        const base =
          size === "lg"
            ? "relative z-10 cursor-pointer rounded-full px-[20px] py-[12px] text-[15px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-[30px] sm:py-[16px] sm:text-[19px]"
            : "relative z-10 cursor-pointer rounded-full px-[12px] py-[6px] text-[13px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-[17.323px] sm:py-[8.662px] sm:text-[15.158px]";

        // When the sliding pill is present it provides the active fill, so the
        // active chip goes transparent and lets it show through. Before the
        // pill is measured (SSR / first paint) the active chip carries its own
        // fill as a fallback.
        let skin: string;
        if (tone === "dark") {
          skin = active
            ? `font-semibold text-ink focus-visible:outline-white ${pill ? "bg-transparent" : "bg-chip-idle"}`
            : "bg-ai-chip border border-ai-chip-border text-white hover:bg-[#1b2436] focus-visible:outline-white";
        } else {
          skin = active
            ? `font-semibold text-white focus-visible:outline-ink ${pill ? "bg-transparent" : "bg-ink"}`
            : "bg-chip-idle border-[0.812px] border-chip-idle-border text-ink hover:bg-[#e6e6e6] focus-visible:outline-ink";
        }

        return (
          <button
            key={tab.id}
            ref={(el) => {
              btnRefs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`${base} ${skin}`}
          >
            {tab.icon ? (
              <span className={`flex items-center ${size === "lg" ? "gap-[10px]" : "gap-[7px]"}`}>
                {tab.icon}
                {tab.label}
              </span>
            ) : (
              tab.label
            )}
          </button>
        );
      })}
    </div>
  );
}
