"use client";

import { motion } from "framer-motion";
import { ANNUAL_GROWTH } from "@/services/mock";
import { Reveal } from "@/components/common/reveal";

export function AnnualGrowth() {
  const maxBeneficiaries = Math.max(...ANNUAL_GROWTH.map((d) => d.beneficiaries));

  return (
    <section className="container-app py-16 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl">Growth Over Time</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Beneficiaries reached each year since our founding, as our programs have expanded.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-3xl items-end justify-between gap-3 sm:gap-6">
        {ANNUAL_GROWTH.map((datum, index) => {
          const heightPercent = Math.max((datum.beneficiaries / maxBeneficiaries) * 100, 4);
          return (
            <div key={datum.year} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold text-foreground sm:text-sm">
                {datum.beneficiaries.toLocaleString()}
              </span>
              <div className="flex h-40 w-full items-end sm:h-56">
                <motion.div
                  className="w-full rounded-t-md bg-primary"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPercent}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="text-xs text-muted-foreground sm:text-sm">{datum.year}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
