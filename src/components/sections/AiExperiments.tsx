"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { Carousel } from "@/components/Carousel";
import { Lightbox } from "@/components/Lightbox";
import { MagneticField } from "@/components/MagneticField";
import { MediaTile } from "@/components/MediaTile";
import { SectionLabel } from "@/components/SectionLabel";
import { TabChips } from "@/components/TabChips";
import { aiExperiments, type AiTab } from "@/content/aiExperiments";

export function AiExperiments() {
  const [activeId, setActiveId] = useState(aiExperiments.tabs[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active =
    aiExperiments.tabs.find((t) => t.id === activeId) ?? aiExperiments.tabs[0];

  return (
    <section id="ai" className="flex flex-col gap-8">
      <SectionLabel>{aiExperiments.label}</SectionLabel>

      <div className="relative w-full py-[92px] lg:h-[784px] lg:py-0">
        {/* Black slab, clipped to the wavy silhouette, carrying the dot field. */}
        <div
          aria-hidden
          style={{
            maskImage: "url(/assets/ai/slab.svg)",
            WebkitMaskImage: "url(/assets/ai/slab.svg)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
          className="pointer-events-none absolute inset-x-0 top-[6.73px] bottom-[17.56px] bg-black"
        >
          <MagneticField className="absolute inset-0 size-full" />
        </div>

        {/* The wavy edge lines trace the top and bottom of the slab. */}
        <div
          aria-hidden
          style={{
            backgroundImage: "url(/assets/ai/wave-top.svg)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className="pointer-events-none absolute inset-x-0 top-[4.28px] h-[12.386px]"
        />
        <div
          aria-hidden
          style={{
            backgroundImage: "url(/assets/ai/wave-bottom.svg)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className="pointer-events-none absolute inset-x-0 bottom-[15.5px] h-[12.386px]"
        />

        <div className="relative flex flex-col justify-center gap-[60px] lg:h-full">
          <div className="flex flex-col items-center gap-[24px] px-[24px]">
            <h2 className="font-display text-[26px] text-white">
              {aiExperiments.titleLead}
              <strong className="font-bold">{aiExperiments.titleAccent}</strong>
              {aiExperiments.titleTrail}
            </h2>
            <TabChips
              tabs={aiExperiments.tabs}
              activeId={activeId}
              onChange={setActiveId}
              tone="dark"
              ariaLabel="AI experiment categories"
            />
          </div>

          {active.cards.length > 0 ? (
            /* Full-bleed: the row scrolls the whole viewport width. */
            <Carousel
              gap={16}
              startInset={24}
              lgStartInset={60}
              ariaLabel={`${active.label} clips`}
            >
              {active.cards.map((card, i) => (
                <MediaTile
                  key={card.id}
                  card={card}
                  height={aiExperiments.cardHeight}
                  variant="media"
                  onOpen={() => setOpenIndex(i)}
                />
              ))}
            </Carousel>
          ) : active.placeholder ? (
            <ComingSoon placeholder={active.placeholder} />
          ) : null}
        </div>
      </div>

      {openIndex !== null ? (
        <Lightbox
          tabs={aiExperiments.tabs}
          activeTabId={activeId}
          index={openIndex}
          onTabChange={setActiveId}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          ariaLabel="AI experiments"
        />
      ) : null}
    </section>
  );
}

function ComingSoon({
  placeholder,
}: {
  placeholder: NonNullable<AiTab["placeholder"]>;
}) {
  return (
    <div className="flex h-[300px] items-center justify-center">
      {/* The frame clips the ribbon, so it runs off both edges of the artwork. */}
      <div className="relative size-[300px] overflow-hidden">
        <Image
          src={placeholder.image}
          alt=""
          fill
          sizes="300px"
          className="rounded-[24px] object-cover"
        />
        <div className="absolute top-[43px] left-[-55px] flex w-[412px] rotate-[4deg] items-center gap-[10px] bg-black p-[10px]">
          {Array.from({ length: placeholder.repeat }).map((_, i) => (
            <Fragment key={i}>
              {i > 0 ? (
                <span
                  aria-hidden
                  className="size-[5px] shrink-0 rounded-full bg-[#F1C40F]"
                />
              ) : null}
              <span className="text-[14px] font-medium whitespace-nowrap text-white">
                {placeholder.ribbon}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
