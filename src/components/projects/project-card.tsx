"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/types";
import { FOCUS_AREAS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { FullBleedImage } from "@/components/common/full-bleed-image";

export function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const focusArea = FOCUS_AREAS.find((area) => area.id === project.category);
  const Icon = focusArea ? ICON_MAP[focusArea.icon] : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${
          focusArea?.gradient ?? "from-primary to-brand-navy"
        }`}
      >
        {!imageFailed ? (
          <FullBleedImage
            src={project.coverImage}
            alt={project.title}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
          />
        ) : Icon ? (
          <Icon className="size-12 text-white/90" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            {focusArea?.title ?? project.category}
          </span>
          {project.status === "completed" ? (
            <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Completed
            </span>
          ) : null}
        </div>
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
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
        >
          View project
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
