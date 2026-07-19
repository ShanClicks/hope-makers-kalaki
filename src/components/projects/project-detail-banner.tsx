"use client";

import { useState, type ReactNode } from "react";
import type { Project } from "@/types";
import { FullBleedImage } from "@/components/common/full-bleed-image";

export function ProjectDetailBanner({
  project,
  gradient,
  icon,
}: {
  project: Project;
  gradient: string;
  icon: ReactNode;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className={`relative flex h-64 items-center justify-center bg-gradient-to-br sm:h-80 ${gradient}`}>
      {!imageFailed ? (
        <FullBleedImage
          src={project.coverImage}
          alt={project.title}
          sizes="100vw"
          priority
          onError={() => setImageFailed(true)}
        />
      ) : (
        icon
      )}
    </section>
  );
}
