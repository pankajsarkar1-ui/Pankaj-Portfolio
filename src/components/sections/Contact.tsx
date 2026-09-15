import { CopyButton } from "@/components/CopyButton";
import { site } from "@/content/site";

const DOT_STYLES: Record<string, string> = {
  linkedin: "bg-[#1c79d1]",
  instagram:
    "bg-linear-to-b from-[#8d0af9] via-[#fe5805] via-[47.115%] to-[#ffc200]",
};

export function Contact() {
  const { eyebrow, headline, links } = site.contact;

  return (
    <section
      id="contact"
      className="flex flex-col gap-[18.667px] rounded-[var(--radius-card)] bg-ink p-[32px] sm:p-[74.667px] lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="flex flex-col items-start gap-[19px]">
        <p className="text-[16px] font-medium tracking-[2.6667px] text-ink-label">
          {eyebrow}
        </p>
        <h2 className="font-display text-[40px] leading-[1.12] font-semibold text-white sm:text-[64px] sm:leading-[72px]">
          {headline}
        </h2>
        <ul className="flex flex-wrap gap-[13.611px] pt-[15.879px]">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            const copyValue = "copy" in link ? link.copy : null;

            return (
              <li
                key={link.label}
                className="flex items-center gap-[8px] rounded-full bg-white px-[20.416px] py-[12.476px] text-[14.745px] font-semibold text-ink transition-opacity has-[a:hover]:opacity-80"
              >
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="flex items-center gap-[4px] rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {"dot" in link && link.dot ? (
                    <span
                      aria-hidden
                      className={`size-[12px] rounded-full ${DOT_STYLES[link.dot]}`}
                    />
                  ) : null}
                  {link.label}
                </a>
                {copyValue ? (
                  <CopyButton value={copyValue} label="email address" />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="flex flex-col gap-[14px] text-[14px] text-white lg:items-end">
        {site.nav.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:opacity-70">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
