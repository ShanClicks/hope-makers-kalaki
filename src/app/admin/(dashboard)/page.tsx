import Link from "next/link";
import { db } from "@/lib/db";

async function getStats() {
  const [
    projects,
    focusAreas,
    news,
    team,
    gallery,
    testimonials,
    coreValues,
    faq,
    impactStats,
    donations,
    completedDonations,
    contactSubmissions,
    recentDonations,
    recentSubmissions,
  ] = await Promise.all([
    db.project.count(),
    db.focusArea.count(),
    db.newsItem.count(),
    db.teamMember.count(),
    db.galleryImage.count(),
    db.testimonial.count(),
    db.coreValue.count(),
    db.faqItem.count(),
    db.impactStat.count(),
    db.donation.count(),
    db.donation.aggregate({ where: { status: "completed" }, _sum: { amount: true } }),
    db.contactSubmission.count(),
    db.donation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return {
    contentCounts: { projects, focusAreas, news, team, gallery, testimonials, coreValues, faq, impactStats },
    donations,
    completedTotal: completedDonations._sum.amount ?? 0,
    contactSubmissions,
    recentDonations,
    recentSubmissions,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of site content and activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Donations" value={stats.donations.toString()} href="/admin/donations" />
        <StatCard
          label="Confirmed Total (UGX)"
          value={stats.completedTotal.toLocaleString()}
          href="/admin/donations"
        />
        <StatCard
          label="Contact Submissions"
          value={stats.contactSubmissions.toString()}
          href="/admin/contact-submissions"
        />
        <StatCard label="Projects" value={stats.contentCounts.projects.toString()} href="/admin/projects" />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Content</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Programs" value={stats.contentCounts.focusAreas.toString()} href="/admin/programs" />
          <StatCard label="News & Events" value={stats.contentCounts.news.toString()} href="/admin/news" />
          <StatCard label="Team Members" value={stats.contentCounts.team.toString()} href="/admin/team" />
          <StatCard label="Gallery Images" value={stats.contentCounts.gallery.toString()} href="/admin/gallery" />
          <StatCard
            label="Testimonials"
            value={stats.contentCounts.testimonials.toString()}
            href="/admin/testimonials"
          />
          <StatCard
            label="Core Values"
            value={stats.contentCounts.coreValues.toString()}
            href="/admin/core-values"
          />
          <StatCard label="FAQ Items" value={stats.contentCounts.faq.toString()} href="/admin/faq" />
          <StatCard
            label="Impact Stats"
            value={stats.contentCounts.impactStats.toString()}
            href="/admin/impact-stats"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Donations</h2>
            <Link href="/admin/donations" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          {stats.recentDonations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No donations yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {stats.recentDonations.map((donation) => (
                <li key={donation.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{donation.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {donation.method} · {donation.status}
                    </p>
                  </div>
                  <span className="font-semibold text-foreground">
                    {donation.currency} {donation.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Contact Submissions</h2>
            <Link href="/admin/contact-submissions" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          {stats.recentSubmissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {stats.recentSubmissions.map((submission) => (
                <li key={submission.id} className="text-sm">
                  <p className="font-medium text-foreground">{submission.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {submission.name} · {submission.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </Link>
  );
}
