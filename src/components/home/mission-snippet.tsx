import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CORE_VALUES } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";
import { Reveal } from "@/components/common/reveal";

export function MissionSnippet() {
  const valueNames = CORE_VALUES.map((value) => value.title.toLowerCase()).join(", ");

  return (
    <section className="container-app py-16 sm:py-20">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <h2 className="text-3xl sm:text-4xl">Who We Are</h2>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          We believe lasting change starts with the community itself. Our work is guided by{" "}
          {valueNames} — principles that shape every program we run across Kalaki
          District.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {CORE_VALUES.map((value) => {
            const Icon = ICON_MAP[value.icon];
            return (
              <span
                key={value.id}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
              >
                {Icon ? <Icon className="size-4" /> : null}
                {value.title}
              </span>
            );
          })}
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
        >
          Learn more about us
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}
