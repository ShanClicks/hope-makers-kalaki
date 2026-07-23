import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FOCUS_AREAS } from "@/services/mock";
import { Reveal } from "@/components/common/reveal";

export function ProgramCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {FOCUS_AREAS.map((area, index) => (
        <Reveal key={area.id} delay={index * 0.08}>
          <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-lg">{area.title}</h3>
            <p className="flex-1 text-sm leading-6 text-muted-foreground">{area.teaser}</p>
            <Link
              href={area.href}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Learn More
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
