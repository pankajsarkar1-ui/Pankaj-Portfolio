"use client";

import { useState } from "react";
import { Carousel } from "@/components/Carousel";
import { Lightbox } from "@/components/Lightbox";
import { MediaTile } from "@/components/MediaTile";
import { SectionLabel } from "@/components/SectionLabel";
import { TabChips } from "@/components/TabChips";
import { beyondWork } from "@/content/beyondWork";

export function BeyondWork() {
  const [activeId, setActiveId] = useState(beyondWork.tabs[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active =
    beyondWork.tabs.find((t) => t.id === activeId) ?? beyondWork.tabs[0];

  return (
    <section id="beyond" className="flex flex-col gap-8">
      <SectionLabel>{beyondWork.label}</SectionLabel>

      <div className="flex flex-col gap-[48px] rounded-[var(--radius-card)] bg-beyond-surface p-[24px] sm:p-[53.333px]">
        <div className="flex flex-col gap-[27px]">
          <h2 className="font-display text-[28px] font-bold text-ink sm:text-[36px]">
            {beyondWork.title}
          </h2>
          <TabChips
            tabs={beyondWork.tabs}
            activeId={activeId}
            onChange={setActiveId}
            ariaLabel="Personal interests"
          />
        </div>

        {/* Negative margins let the row scroll to the card's own edges. */}
        <div className="-mx-[24px] sm:-mx-[53.333px]">
          <Carousel
            gap={20}
            startInset={24}
            lgStartInset={53.333}
            ariaLabel={`${active.label} gallery`}
          >
            {active.cards.map((card, i) => (
              <MediaTile
                key={card.id}
                card={card}
                height={beyondWork.cardHeight}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </Carousel>
        </div>
      </div>

      {openIndex !== null ? (
        <Lightbox
          tabs={beyondWork.tabs}
          activeTabId={activeId}
          index={openIndex}
          onTabChange={setActiveId}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          ariaLabel="Personal interests"
        />
      ) : null}
    </section>
  );
}
