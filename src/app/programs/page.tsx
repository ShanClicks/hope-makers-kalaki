import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { ProgramCards } from "@/components/programs/program-cards";

export const metadata: Metadata = {
  title: "Our Programs",
  description: `Explore ${SITE_CONFIG.name}'s programs in education, women's empowerment, youth empowerment, and maternal & child healthcare.`,
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        description="Four focus areas, one mission: building a stronger, healthier, and more equitable Kalaki District."
        backgroundImage="/images/about/hero.jpg"
        backgroundImageAlt="Hope Makers Kalaki — Bringing Hope. Creating Change."
      />
      <section className="container-app py-16 sm:py-20">
        <ProgramCards />
      </section>
      <CtaSection />
    </>
  );
}
