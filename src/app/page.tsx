import { AiExperiments } from "@/components/sections/AiExperiments";
import { BeyondWork } from "@/components/sections/BeyondWork";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";

/** Yields a 1150px content box at desktop (15% wider than the original Figma grid). */
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1190px] px-[20px]">{children}</div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-[80px] pt-[28px] pb-[80px]">
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
