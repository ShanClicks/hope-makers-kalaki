import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { WaysToHelp } from "@/components/get-involved/ways-to-help";

export const metadata: Metadata = {
  title: "Get Involved",
  description: `Discover the different ways you can support ${SITE_CONFIG.name} — donate, volunteer, partner with us, or help spread the word.`,
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        description="There are many ways to be part of the change we're building across the Kalaki sub-region."
      />
      <WaysToHelp />
    </>
  );
}
