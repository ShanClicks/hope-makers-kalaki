import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional full-bleed background photo. Uses object-cover so it always fills the
   * banner edge-to-edge with no letterboxing; the real heading/description render as
   * HTML text on top, so cropping into any baked-in photo text is not a concern. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export function PageHero({ title, description, backgroundImage, backgroundImageAlt }: PageHeroProps) {
  if (backgroundImage) {
    return (
      <section className="relative flex min-h-56 items-start justify-center overflow-hidden border-b border-border bg-brand-navy pt-10 sm:min-h-72 sm:pt-12 lg:min-h-80">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/75" />
        <div className="container-app relative z-10 flex flex-col items-center gap-4 text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <span className="h-1.5 w-16 rounded-full bg-primary" />
            <h1 className="max-w-3xl text-4xl text-white sm:text-5xl">{title}</h1>
            {description ? (
              <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{description}</p>
            ) : null}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-background">
      <div className="container-app flex flex-col items-center gap-4 py-10 text-center sm:py-14">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="h-1.5 w-16 rounded-full bg-primary" />
          <h1 className="max-w-3xl text-4xl text-foreground sm:text-5xl">{title}</h1>
          {description ? (
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
