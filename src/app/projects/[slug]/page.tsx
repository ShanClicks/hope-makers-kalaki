import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { FOCUS_AREAS, PROJECTS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { CtaSection } from "@/components/common/cta-section";
import { ProjectDetailBanner } from "@/components/projects/project-detail-banner";
import { Reveal } from "@/components/common/reveal";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  planned: "Planned",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const focusArea = FOCUS_AREAS.find((area) => area.id === project.category);
  const Icon = focusArea ? ICON_MAP[focusArea.icon] : null;

  return (
    <>
      <ProjectDetailBanner
        project={project}
        gradient={focusArea?.gradient ?? "from-primary to-brand-navy"}
        icon={Icon ? <Icon className="size-16 text-white/90" /> : null}
      />

      <section className="container-app py-16 sm:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              {focusArea?.title ?? project.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {project.location}
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl">{project.title}</h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <p className="text-base leading-7 text-muted-foreground">{project.description}</p>

            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{project.progress}% funded</span>
                  <span>{project.goalLabel}</span>
                </div>
              </div>
              <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                {STATUS_LABEL[project.status] ?? project.status}
              </span>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Support This Project
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
