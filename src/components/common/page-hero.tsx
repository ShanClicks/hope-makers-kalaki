import type { ReactNode } from "react";
import { Reveal } from "@/components/common/reveal";

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
}

export function PageHero({ title, description }: PageHeroProps) {
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
