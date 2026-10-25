"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { TabChips } from "@/components/TabChips";
import { experience } from "@/content/experience";
import { RESUME } from "@/content/site";

export function Experience() {
  const [activeId, setActiveId] = useState(experience.tabs[0].id);
  const active =
    experience.tabs.find((t) => t.id === activeId) ?? experience.tabs[0];

  return (
    <section id="experience" className="flex flex-col gap-8">
      <SectionLabel>{experience.label}</SectionLabel>

      <div className="flex flex-col gap-[20px] theme-surface rounded-[var(--radius-card)] border border-experience-border bg-white p-[16px] sm:gap-[24px] sm:p-[53.333px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <h2 className="font-display text-[24px] leading-[1.1] font-bold text-ink sm:text-[36px]">
            {experience.title}
          </h2>
          {/* the full CV, as a PDF to keep or forward */}
          <a
            href={RESUME}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-[8px] rounded-full border border-chip-idle-border bg-white px-[16px] py-[9px] text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white sm:text-[15px]"
          >
            {/* a download glyph: the arrow drops into the tray on hover */}
            <svg viewBox="0 0 20 20" aria-hidden className="size-[17px]">
              <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3.5v9m0 0-3.5-3.5M10 12.5l3.5-3.5" className="transition-transform duration-200 group-hover:translate-y-[1.5px]" />
                <path d="M3.5 13.5v1.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
              </g>
            </svg>
            Resume
            <span className="sr-only">(download PDF, opens in a new tab)</span>
          </a>
        </div>

        <TabChips
          tabs={experience.tabs}
          activeId={activeId}
          onChange={setActiveId}
          ariaLabel="Experience type"
        />

        <ul className="flex flex-col">
          {active.rows.map((row, i) => (
            <li
              key={`${row.title}-${row.period}`}
              style={{ width: "100%" }}
              className={`flex flex-col gap-2 py-[14px] sm:flex-row sm:gap-[29.333px] sm:py-[21.333px] ${
                i > 0 ? "border-t-[1.333px] border-dashed border-[#999]" : ""
              }`}
            >
              <p
                style={{ width: active.periodWidth }}
                className="shrink-0 text-[13px] font-semibold text-ink-date sm:text-[17.333px]"
              >
                {row.period}
              </p>
              <div className="flex min-w-0 flex-col gap-[2px] sm:gap-[4px]">
                <p className="text-[17px] font-bold text-ink sm:text-[22.667px]">
                  {row.title}
                </p>
                <p className="text-[13px] text-ink-muted sm:text-[17.333px]">{row.org}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
