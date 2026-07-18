import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { DonateForm } from "@/components/donate/donate-form";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${SITE_CONFIG.name}'s work in education, women's empowerment, youth, and healthcare across the Kalaki sub-region.`,
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        title="Donate"
        description="Your support helps us reach more families across the Kalaki sub-region. Every contribution, of any size, makes a real difference."
      />
      <section className="container-app py-16 sm:py-20">
        <DonateForm />
      </section>
    </>
  );
}
