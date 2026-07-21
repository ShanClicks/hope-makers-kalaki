import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FOCUS_AREAS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { Reveal } from "@/components/common/reveal";

export function ProgramsOverview() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Our Programs</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Four focus areas working together to build a stronger, healthier Kalaki District.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map((area, index) => {
            const Icon = ICON_MAP[area.icon];
            return (
              <Reveal key={area.id} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    {Icon ? <Icon className="size-6" /> : null}
                  </span>
                  <h3 className="text-lg">{area.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{area.description}</p>
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
                  >
                    Learn More
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
