import { Hero } from "@/components/home/hero";
import { MissionSnippet } from "@/components/home/mission-snippet";
import { ProgramsOverview } from "@/components/home/programs-overview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ImpactStats } from "@/components/common/impact-stats";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/common/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSnippet />
      <ProgramsOverview />
      <FeaturedProjects />
      <ImpactStats />
      <Testimonials />
      <CtaSection />
    </>
  );
}
