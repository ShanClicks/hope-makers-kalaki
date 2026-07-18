import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { OurStory } from "@/components/about/our-story";
import { MissionVision } from "@/components/about/mission-vision";
import { CoreValues } from "@/components/about/core-values";
import { TeamSection } from "@/components/about/team-section";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name}'s mission, values, and the team working to improve lives in the Kalaki sub-region.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Learn more about our mission, the values that guide our work, and the team dedicated to improving lives across the Kalaki sub-region."
      />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <CtaSection />
    </>
  );
}
