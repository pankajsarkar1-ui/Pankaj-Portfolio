import { Icon } from "./CaseIcons";

/**
 * Holds the place of an image that's still to come. Sized to the image it
 * stands in for, so the layout won't shift when the real one drops in, and
 * labelled with what belongs there.
 */
export function ImagePlaceholder({
  label,
  hint,
  ratio,
  tone = "surface",
  className = "",
}: {
  label: string;
  hint: string;
  /** Aspect ratio of the image to come, e.g. "4 / 3". */
  ratio: string;
  /** "white" when it sits on a grey tile, so it still reads as a frame. */
  tone?: "surface" | "white";
  className?: string;
}) {
  const onWhite = tone === "white";
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      style={{ aspectRatio: ratio }}
      className={`grid place-items-center rounded-[var(--radius-tile)] border border-dashed border-experience-border p-[24px] ${
        onWhite ? "bg-white" : "bg-beyond-surface"
      } ${className}`}
    >
      <div className="flex max-w-[32ch] flex-col items-center gap-[10px] text-center">
        <span
          className={`grid size-[44px] place-items-center rounded-full text-ink-body ${
            onWhite ? "bg-beyond-surface" : "bg-white"
          }`}
        >
          <Icon name="image" className="size-[22px]" />
        </span>
        <p className="text-[15px] font-semibold text-ink">{label}</p>
        <p className="text-[13px] leading-[1.5] text-ink-body">{hint}</p>
      </div>
    </div>
  );
}
