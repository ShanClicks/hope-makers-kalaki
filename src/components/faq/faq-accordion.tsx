import { FAQ_ITEMS } from "@/services/mock";
import type { FaqCategory } from "@/types";
import { Reveal } from "@/components/common/reveal";
import { Accordion } from "@/components/common/accordion";

const CATEGORIES: FaqCategory[] = [
  "Donations & Giving",
  "Programs & Impact",
  "Volunteering & Partnerships",
  "About Us",
];

export function FaqAccordion() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12">
      {CATEGORIES.map((category, categoryIndex) => {
        const items = FAQ_ITEMS.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <Reveal key={category} delay={categoryIndex * 0.05}>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{category}</h2>
            <div className="mt-4">
              <Accordion items={items} defaultOpenId={categoryIndex === 0 ? items[0]?.id : undefined} />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
