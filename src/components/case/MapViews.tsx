"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon, type IconName } from "./CaseIcons";

type View = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

/**
 * The map, told as a chooser. The three behaviours are selectable rows; picking
 * one swaps the phone beside them. Every image is stacked and cross-faded in
 * place, so the frame never resizes between views — the one authored motion here
 * is that fade.
 */
export function MapViews({
  title,
  body,
  views,
  icons,
  /** Aspect ratio of the shared frame, e.g. "1092 / 900". */
  ratio,
}: {
  title: string;
  body: string;
  views: readonly View[];
  icons: readonly IconName[];
  ratio: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-[28px] lg:flex-row-reverse lg:items-center lg:gap-[72px]">
      {/* the phone — one frame, images cross-fade within it */}
      <div className="mx-auto w-full max-w-[420px] shrink-0 lg:mx-0">
        <div
          className="relative overflow-hidden rounded-[14px] drop-shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
          style={{ aspectRatio: ratio }}
        >
          {views.map((v, i) => (
            <Image
              key={v.image + i}
              src={v.image}
              alt={v.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 420px"
              className={`object-cover transition-opacity duration-500 ease-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== active}
            />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[26px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
            {title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">{body}</p>
        </div>

        <ul className="flex flex-col gap-[12px]">
          {views.map((v, i) => {
            const on = i === active;
            return (
              <li key={v.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full items-start gap-[16px] rounded-[16px] border p-[16px] text-left transition-colors ${
                    on
                      ? "border-accent/30 bg-accent-soft/50"
                      : "border-transparent hover:bg-chip-idle"
                  }`}
                >
                  <span
                    className={`grid size-[42px] shrink-0 place-items-center rounded-full transition-colors ${
                      on ? "bg-accent text-white" : "bg-accent-soft text-accent"
                    }`}
                  >
                    <Icon name={icons[i]} className="size-[20px]" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-[4px] pt-[2px]">
                    <p className={`text-[16px] font-bold ${on ? "text-accent" : "text-ink"}`}>
                      {v.title}
                    </p>
                    <p className="text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">
                      {v.body}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
