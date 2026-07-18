import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FocusArea } from "@/types";
import { IMPACT_STATS, PROJECTS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";

const STAT_ID_BY_FOCUS_AREA: Record<string, string> = {
  education: "children",
  women: "women",
  youth: "youth",
  health: "mothers",
};

export function ProgramSection({ area, index }: { area: FocusArea; index: number }) {
  const Icon = ICON_MAP[area.icon];
  const stat = IMPACT_STATS.find((s) => s.id === STAT_ID_BY_FOCUS_AREA[area.id]);
  const relatedProjects = PROJECTS.filter((p) => p.category === area.id).slice(0, 2);
  const isReversed = index % 2 === 1;

  return (
    <section
      id={area.id}
      className={`scroll-mt-24 py-16 sm:py-20 ${isReversed ? "bg-muted/40" : ""}`}
    >
      <div className="container-app">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div
            className={`flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br sm:h-80 ${area.gradient} ${
              isReversed ? "lg:order-2" : ""
            }`}
          >
            {Icon ? <Icon className="size-16 text-white/90" /> : null}
          </div>

          <div className={`flex flex-col gap-4 ${isReversed ? "lg:order-1" : ""}`}>
            <h2 className="text-3xl sm:text-4xl">{area.title}</h2>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {area.description}
            </p>
            {stat ? (
              <span className="w-fit rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
                {stat.value.toLocaleString()}
                {stat.suffix} {stat.label}
              </span>
            ) : null}

            {relatedProjects.length > 0 ? (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Related Projects
                </span>
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
                  >
                    {project.title}
                    <ArrowRight className="size-3.5" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
