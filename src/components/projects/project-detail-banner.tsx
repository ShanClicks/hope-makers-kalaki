"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import type { Project } from "@/types";

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
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        icon
      )}
    </section>
  );
}
