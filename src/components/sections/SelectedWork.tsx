import { BannerCard } from "@/components/BannerCard";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="flex flex-col gap-5">
      <SectionLabel>Selected Work</SectionLabel>

      <div className="flex flex-col gap-[32px]">
        {projects.map((project) => (
          <BannerCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
