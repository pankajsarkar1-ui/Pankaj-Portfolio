type Message = { from: string; day: string; text: string };

/**
 * A support thread, as the customer lived it: three days of the same
 * question and stock replies that answered nothing, ending in an escalation.
 * The customer sits on the right in ink, support on the left in white, so the
 * back-and-forth reads before a single word does.
 */
export function EscalationThread({
  title,
  tally,
  body,
  caption,
  messages,
  outcome,
}: {
  title: string;
  tally: string;
  body: string;
  caption: string;
  messages: readonly Message[];
  outcome: string;
}) {
  return (
    <figure className="flex flex-col gap-[28px] rounded-[var(--radius-tile)] bg-beyond-surface p-[22px] sm:p-[32px] lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-[56px] lg:p-[48px]">
      <figcaption className="flex flex-col gap-[16px]">
        <h3 className="font-display text-[22px] leading-[1.15] font-bold text-ink sm:text-[28px]">
          {title}
        </h3>
        <p className="font-display text-[28px] leading-[1.08] font-bold tracking-[-0.02em] text-accent sm:text-[40px]">
          {tally}
        </p>
        <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-body sm:text-[16px]">{body}</p>
        <p className="text-[13px] text-ink-body">{caption}</p>
      </figcaption>

      <div className="flex flex-col gap-[14px]">
        {messages.map((m, i) => {
          const mine = m.from === "customer";
          return (
            <div key={i} className={`flex flex-col gap-[6px] ${mine ? "items-end" : "items-start"}`}>
              <span className="text-[12px] text-ink-body">
                {mine ? "Customer" : "Support"} · {m.day}
              </span>
              <p
                className={`max-w-[38ch] rounded-[18px] px-[16px] py-[12px] text-[15px] leading-[1.5] sm:text-[16px] ${
                  mine
                    ? "rounded-tr-[4px] bg-ink text-white"
                    : "rounded-tl-[4px] border border-shell-border bg-white text-ink"
                }`}
              >
                {m.text}
              </p>
            </div>
          );
        })}

        {/* where the thread ends up */}
        <div className="mt-[6px] flex items-center gap-[12px]" aria-label={`Outcome: ${outcome}`}>
          <span aria-hidden className="h-px flex-1 bg-experience-border" />
          <span className="rounded-full bg-ink px-[16px] py-[8px] text-[13px] font-semibold text-white">
            {outcome}
          </span>
          <span aria-hidden className="h-px flex-1 bg-experience-border" />
        </div>
      </div>
    </figure>
  );
}
