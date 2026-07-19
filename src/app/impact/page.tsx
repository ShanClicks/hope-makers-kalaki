import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { ImpactStats } from "@/components/common/impact-stats";
import { AnnualGrowth } from "@/components/impact/annual-growth";
import { ProgramDistribution } from "@/components/impact/program-distribution";

export const metadata: Metadata = {
  title: "Our Impact",
  description: `See the measurable impact ${SITE_CONFIG.name} has made across education, women's empowerment, youth, and healthcare in Kalaki District.`,
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        title="Our Impact"
        description="Numbers tell part of the story — behind every one is a family, a child, or a community we've worked alongside."
      />
      <ImpactStats />
      <AnnualGrowth />
      <ProgramDistribution />
      <CtaSection />
    </>
  );
}
