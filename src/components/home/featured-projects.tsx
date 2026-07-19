import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/services/mock";
import { ProjectCard } from "@/components/projects/project-card";

const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

export function FeaturedProjects() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Featured Projects</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            A look at some of the initiatives currently underway across Kalaki District.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
