import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { ProgramSection } from "@/components/programs/program-section";
import { FOCUS_AREAS } from "@/services/mock";

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
      />
      {FOCUS_AREAS.map((area, index) => (
        <ProgramSection key={area.id} area={area} index={index} />
      ))}
      <CtaSection />
    </>
  );
}
