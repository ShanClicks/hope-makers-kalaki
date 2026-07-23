import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional full-bleed background photo. Defaults to object-cover so it fills the
   * banner edge-to-edge with no letterboxing; the real heading/description render as
   * HTML text on top, so cropping into any baked-in photo text is usually not a concern.
   * Pass backgroundFit="contain" when the baked-in photo content (e.g. a tagline/logo)
   * must stay fully visible on larger screens — on narrow mobile viewports it still falls
   * back to cover, since the letterboxed band left by contain is too short there to avoid
   * the heading/description text colliding with the baked-in content. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundFit?: "cover" | "contain";
}

export function PageHero({
  title,
  description,
  backgroundImage,
  backgroundImageAlt,
  backgroundFit = "cover",
}: PageHeroProps) {
  if (backgroundImage) {
    return (
      <section className="relative flex min-h-85 items-start justify-center overflow-hidden border-b border-border bg-brand-navy pt-14 sm:min-h-105 sm:pt-16 lg:min-h-120">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className={backgroundFit === "contain" ? "object-cover sm:object-contain" : "object-cover"}
        />
        <div className="absolute inset-0 bg-brand-navy/75" />
        <div className="container-app relative z-10 flex flex-col items-center gap-4 text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <span className="h-1.5 w-16 rounded-full bg-primary" />
            <h1 className="text-4xl text-white sm:text-5xl">{title}</h1>
            {description ? (
              <p className="max-w-xl text-base leading-7 text-white/80 sm:text-lg">{description}</p>
            ) : null}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-background">
      <div className="container-app flex flex-col items-center gap-4 py-16 text-center sm:py-20">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="h-1.5 w-16 rounded-full bg-primary" />
          <h1 className="text-4xl text-foreground sm:text-5xl">{title}</h1>
          {description ? (
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
