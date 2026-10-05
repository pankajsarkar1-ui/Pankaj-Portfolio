import { Icon } from "./CaseIcons";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * The root cause, laid out as a comparison: on the left, what the screen told
 * the customer; on the right, what our own systems already knew. The left is
 * quiet white, the right is lit in the accent. The difference between them is
 * the gap the redesign had to close.
 */
export function KnowledgeGap({
  title,
  caption,
  saw,
  knew,
  rows,
  image,
}: {
  title: string;
  caption: string;
  saw: string;
  knew: string;
  rows: readonly { saw: string; knew: string }[];
  image: { label: string; hint: string };
}) {
  return (
    <figure className="flex flex-col gap-[28px] rounded-[var(--radius-tile)] bg-beyond-surface p-[22px] sm:p-[32px] lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-[48px] lg:p-[48px]">
      <div className="flex min-w-0 flex-col gap-[28px]">
        <figcaption className="flex flex-col gap-[6px]">
          <h3 className="font-display text-[22px] leading-[1.1] font-bold text-ink sm:text-[28px]">
            {title}
          </h3>
          <p className="max-w-[60ch] text-[15px] leading-[1.6] text-ink-body sm:text-[16px]">{caption}</p>
        </figcaption>

        <div className="flex flex-col gap-[12px]">
          {/* column heads, from lg up; below that each cell carries its own */}
          <div
            aria-hidden
            className="hidden text-[13px] font-medium text-ink-body lg:grid lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] lg:gap-[12px]"
          >
            <span>{saw}</span>
            <span />
            <span>{knew}</span>
          </div>

          <ol className="flex flex-col gap-[12px]">
            {rows.map((r) => (
              <li
                key={r.saw}
                className="grid gap-[8px] lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] lg:items-stretch lg:gap-[12px]"
              >
                <div className="flex flex-col gap-[4px] rounded-[14px] border border-shell-border bg-white px-[16px] py-[14px]">
                  <span className="text-[12px] text-ink-body lg:hidden">{saw}</span>
                  <p className="text-[15px] leading-[1.45] text-ink-body sm:text-[16px]">{r.saw}</p>
                </div>
                <span aria-hidden className="hidden place-items-center text-ink-body lg:grid">
                  <Icon name="arrow" className="size-[18px]" />
                </span>
                <div className="flex flex-col gap-[4px] rounded-[14px] bg-accent px-[16px] py-[14px] text-white">
                  <span className="text-[12px] text-white/75 lg:hidden">{knew}</span>
                  <p className="text-[15px] leading-[1.45] font-medium sm:text-[16px]">{r.knew}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ImagePlaceholder
        label={image.label}
        hint={image.hint}
        ratio="9 / 16"
        tone="white"
        className="mx-auto w-full max-w-[300px] lg:mx-0"
      />
    </figure>
  );
}
