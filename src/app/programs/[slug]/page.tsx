import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FOCUS_AREAS, IMPACT_STATS, PROJECTS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/common/reveal";

const STAT_ID_BY_FOCUS_AREA: Record<string, string> = {
  education: "children",
  women: "women",
  youth: "youth",
  health: "mothers",
};

export function generateStaticParams() {
  return FOCUS_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = FOCUS_AREAS.find((a) => a.slug === slug);
  if (!area) return {};
  return { title: area.title, description: area.teaser };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = FOCUS_AREAS.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const Icon = ICON_MAP[area.icon];
  const stat = IMPACT_STATS.find((s) => s.id === STAT_ID_BY_FOCUS_AREA[area.id]);
  const relatedProjects = PROJECTS.filter((p) => p.category === area.id);
  const hasPhotoHero = area.slug === "youth-empowerment";

  return (
    <>
      {hasPhotoHero ? (
        <PageHero
          title={area.title}
          description="Equipping young people with financial literacy, skilling, and modern farming practices to build their own future."
          backgroundImage="/images/about/hero.jpg"
          backgroundImageAlt="Hope Makers Kalaki — Bringing Hope. Creating Change."
        />
      ) : (
        <>
          <PageHero title={area.title} />
          <section className={`flex h-56 items-center justify-center bg-gradient-to-br sm:h-72 ${area.gradient}`}>
            {Icon ? <Icon className="size-16 text-white/90" /> : null}
          </section>
        </>
      )}

      <section className="container-app py-16 sm:py-20">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
        >
          <ArrowLeft className="size-4" />
          Back to Programs
        </Link>

        <Reveal className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-left text-base leading-7 text-muted-foreground sm:text-lg">{area.description}</p>
          {stat ? (
            <span className="w-fit rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
              {stat.value.toLocaleString()}
              {stat.suffix} {stat.label}
            </span>
          ) : null}
        </Reveal>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="bg-muted/40 py-16 sm:py-20">
          <div className="container-app">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl">Related Projects</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Initiatives putting this program into action across Kalaki District.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.08}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
