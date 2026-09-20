"use client";

import { useEffect, useRef, useState } from "react";
import { BannerCard } from "@/components/BannerCard";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/projects";

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        visible
          ? "animate-[scrollReveal_600ms_cubic-bezier(.22,1,.36,1)_both]"
          : "opacity-0 translate-y-[40px] scale-[0.96] transition-[opacity,transform] duration-300"
      }
    >
      {children}
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="flex flex-col gap-5">
      <SectionLabel>Selected Work</SectionLabel>

      <div className="flex flex-col gap-[32px]">
        {projects.map((project) => (
          <ScrollReveal key={project.id}>
            <BannerCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
