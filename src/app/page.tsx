import { Hero } from "@/components/home/hero";
import { ProgramsOverview } from "@/components/home/programs-overview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { IntroVideo } from "@/components/home/intro-video";
import { ImpactStats } from "@/components/common/impact-stats";
import { Testimonials } from "@/components/home/testimonials";
import { FollowOurWork } from "@/components/home/follow-our-work";
import { DonationImpact } from "@/components/home/donation-impact";
import { CtaSection } from "@/components/common/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsOverview />
      <FeaturedProjects />
      <IntroVideo />
      <CtaSection />
      <ImpactStats />
      <Testimonials />
      <FollowOurWork />
      <DonationImpact />
    </>
  );
}
