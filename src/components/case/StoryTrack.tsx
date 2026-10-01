import { Icon } from "./CaseIcons";

type Tone = "plain" | "rejected" | "twist";

/**
 * The turn, told as a track. The rejected beat is struck through, and the gap
 * from it to the twist is dashed — the month that passed — so the sequence
 * reads before the copy does. Vertical on phones, horizontal from `lg`.
 */
export function StoryTrack({
  beats,
}: {
  beats: readonly { title: string; body: string; tone: Tone }[];
}) {
  return (
    <ol className="grid lg:grid-cols-4 lg:gap-[28px]">
      {beats.map((b, i) => {
        const next = beats[i + 1];
        // The stretch that leads into the twist is the month that went by.
        const waiting = next?.tone === "twist";

        return (
          <li key={b.title} className="relative flex gap-[18px] pb-[30px] lg:flex-col lg:gap-[20px] lg:pb-0">
            {next ? (
              <span
                aria-hidden
                className={`absolute top-[30px] bottom-0 left-[14px] border-l lg:top-[14px] lg:right-[-28px] lg:bottom-auto lg:left-[30px] lg:border-t lg:border-l-0 ${
                  waiting ? "border-dashed border-accent" : "border-ink/20"
                }`}
              />
            ) : null}

            <span
              aria-hidden
              className={`relative z-10 grid size-[29px] shrink-0 place-items-center rounded-full ${
                b.tone === "twist"
                  ? "bg-accent text-white"
                  : b.tone === "rejected"
                    ? "border border-ink/25 bg-white text-ink-body"
                    : "border-[1.5px] border-ink bg-white"
              }`}
            >
              {b.tone === "twist" ? (
                <Icon name="check" className="size-[15px]" />
              ) : b.tone === "rejected" ? (
                <Icon name="cross" className="size-[13px]" />
              ) : null}
            </span>

            <div className="flex min-w-0 flex-col gap-[6px] pt-[2px] lg:pt-0">
              <h3
                className={`font-display text-[18px] leading-[1.2] font-bold sm:text-[22px] ${
                  b.tone === "twist"
                    ? "text-accent"
                    : b.tone === "rejected"
                      ? "text-ink-body line-through decoration-[1.5px]"
                      : "text-ink"
                }`}
              >
                {b.title}
              </h3>
              <p className="max-w-[44ch] text-[13px] leading-[1.55] text-ink-body sm:text-[15px]">
                {b.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
