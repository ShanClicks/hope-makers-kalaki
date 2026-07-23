import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

export function DonateHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-app flex flex-col items-center gap-5 py-16 text-center sm:py-20">
        <Reveal className="flex flex-col items-center gap-5">
          <span className="h-1.5 w-16 rounded-full bg-primary" />
          <h1 className="max-w-2xl text-4xl text-foreground sm:text-5xl">
            Make a <span className="text-accent">Difference</span> Today
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Every donation, big or small, directly funds education, women&apos;s empowerment, youth
            programs, and maternal health care across Kalaki District.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href="#payment-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Heart className="size-4 fill-current" />
              Donate Now
            </a>
            <Link
              href="/impact"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              See Impact
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
