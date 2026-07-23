import Link from "next/link";
import { Reveal } from "@/components/common/reveal";

// Mirrors the amount tiers offered in the donate form (src/components/donate/donate-form.tsx).
const TIERS = [
  {
    amount: "UGX 50,000",
    description: "Provides school supplies and materials for a child in need.",
  },
  {
    amount: "UGX 100,000",
    description: "Supports a woman's starter kit through our vocational or savings programs.",
  },
  {
    amount: "UGX 500,000",
    description: "Funds a maternal health outreach visit reaching mothers and children in a remote village.",
  },
];

export function DonationImpact() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-12 sm:px-12 sm:py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-3xl text-white sm:text-4xl">Every Donation Creates Impact</h2>
            <p className="text-base leading-7 text-white/80">
              Your donation directly funds education, women&apos;s empowerment, youth programs, and
              maternal health care that transform lives across Kalaki District.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.amount}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/30 bg-white/10 p-6 text-center"
              >
                <span className="text-2xl font-bold text-white">{tier.amount}</span>
                <p className="text-sm leading-6 text-white/80">{tier.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
            >
              Donate Now
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Monthly Giving
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
