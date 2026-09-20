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

      <div className="flex flex-col gap-[20px] rounded-[var(--radius-card)] border border-experience-border bg-white p-[16px] sm:gap-[24px] sm:p-[53.333px]">
        <h2 className="text-[20px] font-bold text-ink sm:text-[37.333px]">
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
