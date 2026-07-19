import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from ${SITE_CONFIG.name}'s programs and community across Kalaki District.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        description="A look at our programs and the community we serve across Kalaki District."
      />
      <section className="container-app py-16 sm:py-20">
        <GalleryGrid />
      </section>
      <CtaSection />
    </>
  );
}
