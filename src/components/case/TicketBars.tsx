/**
 * The result as a comparison rather than a lone number: ticket creation
 * before and after, drawn to scale relative to each other. The bars are
 * relative — no absolute volumes are claimed, only the halving.
 */
export function TicketBars({
  stat,
  label,
}: {
  /** e.g. "50%" — the reduction; the after bar is drawn at (100 − stat)%. */
  stat: string;
  label: string;
}) {
  const reduction = Number.parseFloat(stat);
  const after = Math.max(0, Math.min(100, 100 - reduction));

  return (
    <figure className="flex flex-col gap-[22px]">
      <div className="flex items-end gap-[14px]">
        <span className="font-display text-[48px] leading-[0.85] font-bold tracking-[-0.03em] text-accent-lime sm:text-[72px]">
          {stat}
        </span>
        <span className="font-display max-w-[11ch] pb-[6px] text-[18px] leading-[1.15] font-semibold text-white sm:pb-[10px] sm:text-[22px]">
          {label}
        </span>
      </div>

      <div className="flex flex-col gap-[14px]">
        <div className="flex flex-col gap-[7px]">
          <span className="font-mono text-[12px] text-white/80">Before</span>
          <span className="block h-[16px] w-full rounded-full bg-white/30" />
        </div>
        <div className="flex flex-col gap-[7px]">
          <span className="font-mono text-[12px] text-white/80">After</span>
          <span
            className="block h-[16px] rounded-full bg-accent-lime"
            style={{ width: `${after}%` }}
          />
        </div>
      </div>

      <figcaption className="text-[12px] text-white/80">
        Tickets created, relative to before the redesign.
      </figcaption>
    </figure>
  );
}
