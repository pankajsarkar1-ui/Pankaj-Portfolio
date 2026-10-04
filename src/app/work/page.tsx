import type { Metadata } from "next";
import { PillNav } from "@/components/PillNav";
import { Contact } from "@/components/sections/Contact";
import { WorkExplorer } from "@/components/sections/WorkExplorer";
import { site } from "@/content/site";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description: work.intro,
};

/** Same column as the homepage and About, so the pages share one frame. */
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[min(1190px,max(64vw,720px))] px-[16px] sm:px-[20px]">
      {children}
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <PillNav />
      <main className="flex flex-col gap-[72px] pt-[16px] pb-[40px] sm:gap-[128px] sm:pt-[28px] sm:pb-[80px] lg:gap-[160px]">
        <Column>
          <div className="flex flex-col gap-[32px] sm:gap-[48px]">
            <WorkExplorer />
          </div>
        </Column>
        <Column>
          <Contact />
        </Column>
      </main>
    </>
  );
}
