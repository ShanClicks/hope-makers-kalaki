"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

interface Slide {
  src: string;
  alt: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/home/model-farm.jpg",
    alt: "Piggery, goat keeping, and cattle at the Hope Makers Kalaki Model Farm",
    tag: "Model Farm",
  },
  {
    src: "/images/home/sacco.jpg",
    alt: "Community members saving together through the Hope Makers Kalaki SACCO",
    tag: "SACCO",
  },
  {
    src: "/images/home/menstrual-hygiene.jpg",
    alt: "Reusable sanitary pads being distributed through our Menstrual Hygiene Initiative",
    tag: "Menstrual Hygiene Initiative",
  },
  {
    src: "/images/home/child-maternal-care.jpg",
    alt: "A mother and child receiving community-based health support",
    tag: "Child & Maternal Care",
  },
];

const AUTO_ADVANCE_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  function goTo(target: number) {
    setIndex(((target % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className="relative h-[560px] overflow-hidden text-white sm:h-[620px] lg:h-[700px]">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {failed[i] ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900">
              <ImageOff className="size-10 text-white/40" />
            </div>
          ) : (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <span className="absolute left-6 top-6 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground sm:left-8 sm:top-8">
            {slide.tag}
          </span>
        </div>
      ))}

      <div className="container-app relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
          {SITE_CONFIG.address}
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {SITE_CONFIG.tagline}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          {SITE_CONFIG.description}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Donate Now
          </Link>
          <Link
            href="/get-involved"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Get Involved
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
