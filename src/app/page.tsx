import { AiExperiments } from "@/components/sections/AiExperiments";
import { BeyondWork } from "@/components/sections/BeyondWork";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";

/**
 * Caps at 1190px (a 1150px content box, 15% wider than the original Figma
 * grid). Between roughly 1125px and 1860px it tracks 64vw so the gutter grows
 * with the window rather than collapsing on laptops; the 720px floor keeps it
 * above the viewport on phones and tablets, where `w-full` takes over.
 */
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[min(1190px,max(64vw,720px))] px-[16px] sm:px-[20px]">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-[40px] pt-[16px] pb-[40px] sm:gap-[80px] sm:pt-[28px] sm:pb-[80px]">
      <Column>
        <Hero />
      </Column>
      <Column>
        <SelectedWork />
      </Column>

      {/* Full-bleed: the wavy slab spans the viewport. */}
      <AiExperiments />

      <Column>
        <BeyondWork />
      </Column>
      <Column>
        <Experience />
      </Column>
      <Column>
        <Contact />
      </Column>
    </main>
  );
}
