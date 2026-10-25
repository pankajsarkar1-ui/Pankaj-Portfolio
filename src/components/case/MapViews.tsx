import Image from "next/image";
import { Icon, type IconName } from "./CaseIcons";

type Point = {
  title: string;
  body: string;
};

/**
 * The map, as one isolated fragment with its three behaviours listed beside
 * it. There is one real image (the macro view), so the behaviours are notes
 * rather than a chooser: a switcher would only promise views it can't show.
 */
export function MapViews({
  title,
  body,
  image,
  alt,
  points,
  icons,
  /** Aspect ratio of the image's frame, e.g. "1092 / 900". */
  ratio,
}: {
  title: string;
  body: string;
  image: string;
  alt: string;
  points: readonly Point[];
  icons: readonly IconName[];
  ratio: string;
}) {
  return (
    <div className="flex flex-col gap-[28px] lg:flex-row-reverse lg:items-center lg:gap-[72px]">
      <div className="mx-auto w-full max-w-[420px] shrink-0 lg:mx-0">
        <div
          className="relative overflow-hidden rounded-[14px] drop-shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
          style={{ aspectRatio: ratio }}
        >
          <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 92vw, 420px" className="object-cover" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[26px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
            {title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-ink-body sm:text-[18px]">{body}</p>
        </div>

        <ul className="flex flex-col gap-[20px]">
          {points.map((p, i) => (
            <li key={p.title} className="flex items-start gap-[16px]">
              <span className="grid size-[42px] shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Icon name={icons[i]} className="size-[20px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-[4px] pt-[2px]">
                <p className="text-[16px] font-bold text-ink">{p.title}</p>
                <p className="text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
