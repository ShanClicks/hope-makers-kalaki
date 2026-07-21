import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { LocationMap } from "@/components/contact/location-map";
import { Reveal } from "@/components/common/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name}. We'd love to hear from you.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        description="Have a question about our programs, want to partner with us, or just want to say hello? We'd love to hear from you."
      />

      <section className="container-app py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <ContactInfo />
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
        <Reveal className="mt-12" delay={0.15}>
          <LocationMap />
        </Reveal>
      </section>
    </>
  );
}
