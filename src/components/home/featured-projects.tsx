import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/services/mock";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/common/reveal";

const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

export function FeaturedProjects() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Featured Projects</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            A look at some of the initiatives currently underway across Kalaki District.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
