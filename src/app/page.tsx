import { Hero } from "@/components/home/hero";
import { ProgramsOverview } from "@/components/home/programs-overview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ImpactStats } from "@/components/common/impact-stats";
import { VoicesFromKalaki } from "@/components/home/voices-from-kalaki";
import { FollowOurWork } from "@/components/home/follow-our-work";
import { DonationImpact } from "@/components/home/donation-impact";
import { CtaSection } from "@/components/common/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsOverview />
      <FeaturedProjects />
      <CtaSection />
      <ImpactStats />
      <VoicesFromKalaki />
      <FollowOurWork />
      <DonationImpact />
    </>
  );
}
