"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { GALLERY_IMAGES } from "@/services/mock";
import type { GalleryCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "education", label: "Education" },
  { id: "women", label: "Women" },
  { id: "youth", label: "Youth" },
  { id: "healthcare", label: "Healthcare" },
  { id: "events", label: "Events" },
];

const SPAN_CLASS: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((image) => image.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-brand-navy",
              SPAN_CLASS[image.span ?? "normal"]
            )}
          >
            {!failedImages[image.id] ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
                onError={() => setFailedImages((prev) => ({ ...prev, [image.id]: true }))}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageOff className="size-8 text-white/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
