import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { CtaSection } from "@/components/common/cta-section";
import { NewsCard } from "@/components/news/news-card";
import { NEWS_ITEMS } from "@/services/mock";

export const metadata: Metadata = {
  title: "News & Events",
  description: `Stay up to date with ${SITE_CONFIG.name}'s latest news, milestones, and upcoming events in Kalaki District.`,
};

export default function NewsPage() {
  const sortedItems = [...NEWS_ITEMS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        title="News & Events"
        description="Updates from the field, program milestones, and upcoming events across Kalaki District."
      />

      <section className="container-app py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
