import type { Metadata } from "next";
import { PillNav } from "@/components/PillNav";
import { Contact } from "@/components/sections/Contact";
import { FolderStacks } from "@/components/sections/FolderStacks";
import { Profile } from "@/components/sections/Profile";
import { Timeline } from "@/components/sections/Timeline";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: profile.description,
};

/** Same column as the homepage, so the two pages share one frame. */
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[min(1190px,max(64vw,720px))] px-[16px] sm:px-[20px]">
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PillNav />
      <main className="flex flex-col gap-[72px] pt-[16px] pb-[40px] sm:gap-[128px] sm:pt-[28px] sm:pb-[80px] lg:gap-[160px]">
        <Column>
          <Profile />
        </Column>
        <Column>
          <FolderStacks />
        </Column>
        <Column>
          <Timeline />
        </Column>
        <Column>
          <Contact />
        </Column>
      </main>
    </>
  );
}
