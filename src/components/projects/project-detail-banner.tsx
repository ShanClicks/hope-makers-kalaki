"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
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
  const firstImage = project.images[0];

  return (
    <motion.section
      className={`relative flex h-64 items-center justify-center bg-gradient-to-br sm:h-80 ${gradient}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {firstImage && !imageFailed ? (
        <FullBleedImage
          src={firstImage}
          alt={project.title}
          sizes="100vw"
          priority
          onError={() => setImageFailed(true)}
        />
      ) : (
        icon
      )}
    </motion.section>
  );
}
