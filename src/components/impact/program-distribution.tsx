"use client";

import { motion } from "framer-motion";
import { PROGRAM_DISTRIBUTION } from "@/services/mock";
import { Reveal } from "@/components/common/reveal";

export function ProgramDistribution() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Where Our Impact Goes</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            A breakdown of how our program efforts are distributed across focus areas.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-5">
          {PROGRAM_DISTRIBUTION.map((datum, index) => (
            <div key={datum.label} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{datum.label}</span>
                <span className="text-muted-foreground">{datum.value}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${datum.value}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
