"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Slide {
  id: string;
  headline: string;
  subhead: string;
  image?: string;
}

const SLIDES: Slide[] = [
  {
    id: "model-farm",
    headline: "Growing Kalaki's Future, One Farm at a Time",
    subhead:
      "Teaching sustainable livestock and agriculture skills that put food and income back into Kalaki families' hands.",
    image: "/images/home/model-farm.png",
  },
  {
    id: "sacco",
    headline: "Saving Together, Building Together",
    subhead:
      "Bringing Kalaki together to save, borrow, and build financial independence, one community meeting at a time.",
    image: "/images/home/sacco.png",
  },
  {
    id: "menstrual-hygiene",
    headline: "Dignity Shouldn't Cost a School Day",
    subhead:
      "Keeping girls in school and informed, so a natural part of growing up never has to mean falling behind.",
    image: "/images/home/menstrual-hygiene.png",
  },
  {
    id: "child-maternal-care",
    headline: "Every Mother, Every Child, Cared For",
    subhead:
      "Supporting mothers and children with the essentials they need for a healthy start, delivered directly into the community.",
    image: "/images/home/maternal-care.jpg",
  },
];

const AUTO_ADVANCE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  function goTo(target: number) {
    setIndex(((target % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-primary to-brand-royal-dark text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative h-120 sm:h-140 lg:h-160">
        {SLIDES.map((slide, i) => {
          const isActive = i === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              {slide.image ? (
                <>
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-brand-navy/50" />
                </>
              ) : null}
              <div className="container-app relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                  {slide.subhead}
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/donate"
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    <Heart className="size-5 fill-current" />
                    Donate Now
                  </Link>
                  <Link
                    href="/about"
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/70 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
                  >
                    <BookOpen className="size-5" />
                    Our Story
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
