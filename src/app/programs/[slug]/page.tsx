import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FOCUS_AREAS, IMPACT_STATS } from "@/services/mock";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { Reveal } from "@/components/common/reveal";

const STAT_ID_BY_FOCUS_AREA: Record<string, string> = {
  education: "children",
  women: "women",
  youth: "youth",
  health: "mothers",
};

const PROGRAM_VIDEO_BY_SLUG: Record<string, { url: string; label: string }> = {
  "youth-empowerment": { url: "https://www.youtube.com/embed/4gvDhCytJGk", label: "Skilling" },
  "maternal-child-healthcare": { url: "https://www.youtube.com/embed/d2WDIzVhSqM", label: "Health Outreach" },
  "women-empowerment": { url: "https://www.youtube.com/embed/0dudl1tA4Vs", label: "Women Empowerment" },
};

const PROGRAM_HEADING_BY_SLUG: Record<string, string> = {
  "youth-empowerment": "Real Skills for a Real Future",
  "maternal-child-healthcare": "Care That Reaches Every Corner of Kalaki",
  "women-empowerment": "Opportunity Built by Women, for Women",
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

  const stat = IMPACT_STATS.find((s) => s.id === STAT_ID_BY_FOCUS_AREA[area.id]);
  const isYouthEmpowerment = area.slug === "youth-empowerment";
  const video = PROGRAM_VIDEO_BY_SLUG[area.slug];
  const videoSectionHeading = PROGRAM_HEADING_BY_SLUG[area.slug];

  return (
    <>
      <PageHero
        title={area.title}
        description={
          isYouthEmpowerment
            ? "Equipping young people with financial literacy, skilling, and modern farming practices to build their own future."
            : area.teaser
        }
        backgroundImage="/images/about/hero.jpg"
        backgroundImageAlt="Hope Makers Kalaki — Bringing Hope. Creating Change."
      />

      <section className="container-app py-16 sm:py-20">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
        >
          <ArrowLeft className="size-4" />
          Back to Programs
        </Link>

        {video ? (
          <>
            {videoSectionHeading ? (
              <h2 className="mt-6 text-center text-3xl sm:text-4xl">{videoSectionHeading}</h2>
            ) : null}

            <Reveal className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <p className="text-left text-base leading-7 text-muted-foreground sm:text-lg">{area.description}</p>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-sm">
                <iframe
                  src={video.url}
                  title={`${area.title} ${video.label} — Hope Makers Kalaki`}
                  className="absolute inset-0 size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          </>
        ) : (
          <Reveal className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-5 text-center">
            <p className="text-left text-base leading-7 text-muted-foreground sm:text-lg">{area.description}</p>
            {stat ? (
              <span className="w-fit rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
                {stat.value.toLocaleString()}
                {stat.suffix} {stat.label}
              </span>
            ) : null}
          </Reveal>
        )}
      </section>

      <CtaSection />
    </>
  );
}
