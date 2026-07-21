import { Eye, Target } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { Reveal } from "@/components/common/reveal";

export function MissionVision() {
  return (
    <section className="container-app py-16 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        <Reveal className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
            <Target className="size-7" />
          </span>
          <h2 className="text-2xl sm:text-3xl">Our Mission</h2>
          <p className="text-base leading-7 text-muted-foreground">{SITE_CONFIG.description}</p>
        </Reveal>

        <Reveal
          className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-sm"
          delay={0.1}
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
            <Eye className="size-7" />
          </span>
          <h2 className="text-2xl sm:text-3xl">Our Vision</h2>
          <p className="text-base leading-7 text-muted-foreground">{SITE_CONFIG.vision}</p>
        </Reveal>
      </div>
    </section>
  );
}
