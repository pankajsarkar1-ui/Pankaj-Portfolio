"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { TabChips } from "@/components/TabChips";
import { experience } from "@/content/experience";

export function Experience() {
  const [activeId, setActiveId] = useState(experience.tabs[0].id);
  const active =
    experience.tabs.find((t) => t.id === activeId) ?? experience.tabs[0];

  return (
    <section id="experience" className="flex flex-col gap-8">
      <SectionLabel>{experience.label}</SectionLabel>

      <div className="flex flex-col gap-[24px] rounded-[var(--radius-card)] border border-experience-border bg-white p-[24px] sm:p-[53.333px]">
        <h2 className="text-[28px] font-bold text-ink sm:text-[37.333px]">
          {experience.title}
        </h2>

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
              className={`flex flex-col gap-2 py-[21.333px] sm:flex-row sm:gap-[29.333px] ${
                i > 0 ? "border-t-[1.333px] border-dashed border-[#999]" : ""
              }`}
            >
              <p
                style={{ width: active.periodWidth }}
                className="shrink-0 text-[17.333px] font-semibold text-ink-date"
              >
                {row.period}
              </p>
              <div className="flex min-w-0 flex-col gap-[4px]">
                <p className="text-[22.667px] font-bold text-ink">
                  {row.title}
                </p>
                <p className="text-[17.333px] text-ink-muted">{row.org}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
