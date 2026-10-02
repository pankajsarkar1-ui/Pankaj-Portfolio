import Image from "next/image";

/**
 * A phone drawn around a bare 360×800 screen export (shipped at 720×1600), so
 * the screen can sit on any colour instead of carrying its frame's background.
 * Radii are elliptical percentages tuned to the 9:20 screen, so the corners stay
 * round at every width.
 */
export function Phone({
  src,
  alt,
  sizes,
  priority,
  /** "dark" for light surfaces; "slate" lifts the bezel off a navy band. */
  bezel = "dark",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  bezel?: "dark" | "slate";
  className?: string;
}) {
  return (
    <div
      className={`rounded-[14%/6.4%] p-[3.2%] shadow-[0_28px_56px_-24px_rgba(18,25,38,0.55)] ${
        bezel === "dark" ? "bg-[#121926]" : "bg-[#2b3445] ring-1 ring-white/10"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={720}
        height={1600}
        sizes={sizes}
        quality={90}
        priority={priority}
        className="block h-auto w-full rounded-[11%/5%]"
      />
    </div>
  );
}
