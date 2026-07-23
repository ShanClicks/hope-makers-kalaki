import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { FaqAccordion } from "@/components/faq/faq-accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Answers to common questions about donating to, volunteering with, and partnering with ${SITE_CONFIG.name}.`,
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Answers to common questions about our programs, donations, and how to get involved."
      />
      <section className="container-app py-16 sm:py-20">
        <FaqAccordion />
      </section>
      <CtaSection />
    </>
  );
}
