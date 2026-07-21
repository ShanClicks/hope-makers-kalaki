import { IMPACT_STATS } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Reveal } from "@/components/common/reveal";

export function ImpactStats() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Our Impact</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Every number represents a life touched through our programs across Kalaki.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {IMPACT_STATS.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon];
            return (
              <Reveal key={stat.id} delay={index * 0.06}>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    {Icon ? <Icon className="size-6" /> : null}
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
