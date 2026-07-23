import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { DonateHero } from "@/components/donate/donate-hero";
import { DonationProjects } from "@/components/donate/donation-projects";
import { PaymentMethods } from "@/components/donate/payment-methods";
import { DonateCta } from "@/components/donate/donate-cta";
import { DonateFaq } from "@/components/donate/donate-faq";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${SITE_CONFIG.name}'s work in education, women's empowerment, youth, and healthcare across Kalaki District with instant MTN or Airtel Mobile Money.`,
};

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <DonationProjects />
      <PaymentMethods />
      <DonateCta />
      <DonateFaq />
    </>
  );
}
