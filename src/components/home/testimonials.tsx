"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { FOCUS_AREAS, TESTIMONIALS } from "@/services/mock";
import { getInitials } from "@/lib/utils";

const FEATURED_TESTIMONIALS = [TESTIMONIALS[0], TESTIMONIALS[2]];

export function Testimonials() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Stories of Change</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Hear directly from the people whose lives have been touched by our programs.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {FEATURED_TESTIMONIALS.map((testimonial) => {
            const programLabel =
              FOCUS_AREAS.find((area) => area.id === testimonial.program)?.title ?? testimonial.program;

            return (
              <figure
                key={testimonial.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="size-8 text-primary/40" />
                <blockquote className="flex-1 text-sm leading-6 text-foreground/90 italic">
                  “{testimonial.excerpt}”
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-2">
                  {!failedImages[testimonial.id] ? (
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.portrait}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [testimonial.id]: true }))
                        }
                      />
                    </div>
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {getInitials(testimonial.name)}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{testimonial.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {programLabel} &middot; {testimonial.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
