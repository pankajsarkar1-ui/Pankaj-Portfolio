import { site } from "@/content/site";

export function Nav() {
  return (
    <nav className="border-b border-nav-border bg-white">
      <div className="mx-auto flex h-[112.673px] w-full max-w-[1190px] items-center justify-between px-[20px]">
      <a href="#top" className="flex items-center gap-[9.796px]">
        <span className="size-[13px] rounded-full bg-ink" />
        <span className="text-[17.633px] font-bold text-ink">
          {site.initials}
        </span>
        <span className="sr-only">{site.name} — home</span>
      </a>

      <ul className="hidden gap-[48px] text-[13.714px] font-medium text-ink-nav md:flex">
        {site.nav.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="rounded-full px-[14px] py-[7px] transition-colors hover:bg-[#f0f0f0] hover:text-ink">
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="rounded-full border-[1.469px] border-ink bg-ink px-[15.673px] py-[7.837px] text-[13.714px] text-white transition-colors hover:bg-[#1a1a1a]"
      >
        {site.ctaLabel}
      </a>
      </div>
    </nav>
  );
}
