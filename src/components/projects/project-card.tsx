"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, type LucideIcon } from "lucide-react";
import type { Project } from "@/types";
import { FOCUS_AREAS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { FullBleedImage } from "@/components/common/full-bleed-image";

const SLIDE_INTERVAL_MS = 3500;

function ProjectImageCarousel({
  images,
  title,
  gradient,
  Icon,
}: {
  images: string[];
  title: string;
  gradient: string;
  Icon: LucideIcon | null;
}) {
  // Exactly one real photo gets a trailing placeholder slide so it still reads as a
  // "gallery"; zero real photos falls back to a single static placeholder, no carousel.
  const slides: (string | null)[] = images.length === 1 ? [...images, null] : images.length === 0 ? [null] : images;
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  function goTo(target: number) {
    setIndex(((target % slides.length) + slides.length) % slides.length);
  }

  return (
    <div
      className={`relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      {slides.map((src, i) => {
        const isActive = i === index;
        const showPlaceholder = !src || failed[i];
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {!showPlaceholder && src ? (
              <FullBleedImage
                src={src}
                alt={title}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                fit="cover"
                onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
              />
            ) : Icon ? (
              <div className="flex h-full w-full items-center justify-center">
                <Icon className="size-12 text-white/90" />
              </div>
            ) : null}
          </div>
        );
      })}

      {slides.length > 1 ? (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const focusArea = FOCUS_AREAS.find((area) => area.id === project.category);
  const Icon = focusArea ? ICON_MAP[focusArea.icon] : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <ProjectImageCarousel
        images={project.images}
        title={project.title}
        gradient={focusArea?.gradient ?? "from-primary to-brand-navy"}
        Icon={Icon}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        {project.status === "completed" ? (
          <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Completed
          </span>
        ) : null}
        <h3 className="text-lg">{project.title}</h3>
        <p className="flex-1 text-sm leading-6 text-muted-foreground">{project.summary}</p>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          {project.location}
        </span>
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.progress}% funded</span>
            <span>{project.goalLabel}</span>
          </div>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View project
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
