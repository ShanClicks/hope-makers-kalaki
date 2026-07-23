import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/common/reveal";
import { PROJECTS } from "@/services/mock";

export const metadata: Metadata = {
  title: "Our Projects",
  description: `Browse the projects ${SITE_CONFIG.name} is running across education, women's empowerment, youth, and healthcare in Kalaki District.`,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Our Projects"
        description="A closer look at the initiatives we're running across Kalaki District, from ongoing work to completed milestones."
        backgroundImage="/images/about/hero.jpg"
        backgroundImageAlt="Hope Makers Kalaki — Bringing Hope. Creating Change."
      />

      <section className="container-app py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
