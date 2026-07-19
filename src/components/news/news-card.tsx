"use client";

import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import type { NewsItem } from "@/types";
import { FullBleedImage } from "@/components/common/full-bleed-image";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCard({ item }: { item: NewsItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary to-brand-navy">
        {!imageFailed ? (
          <FullBleedImage
            src={item.image}
            alt={item.title}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Calendar className="size-12 text-white/90" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            {item.category}
          </span>
          {item.type === "event" ? (
            <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Event
            </span>
          ) : null}
        </div>
        <h3 className="text-lg">{item.title}</h3>
        <p className="flex-1 text-sm leading-6 text-muted-foreground">{item.summary}</p>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {item.type === "event" && item.eventDate ? formatDate(item.eventDate) : formatDate(item.date)}
          </span>
          {item.type === "event" && item.location ? (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {item.location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
