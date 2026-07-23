import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS, FOCUS_AREAS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { Reveal } from "@/components/common/reveal";

const FEATURED_PROJECTS = PROJECTS.slice(0, 4);

export function DonationProjects() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">How Your Donation Helps</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            A look at some of the real projects your support goes toward across Kalaki District.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PROJECTS.map((project, index) => {
            const focusArea = FOCUS_AREAS.find((area) => area.id === project.category);
            const Icon = focusArea ? ICON_MAP[focusArea.icon] : null;
            return (
              <Reveal key={project.id} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    {Icon ? <Icon className="size-6" /> : null}
                  </span>
                  <h3 className="text-base">{project.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View project
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
