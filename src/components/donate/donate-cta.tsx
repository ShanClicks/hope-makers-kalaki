import Link from "next/link";
import { Reveal } from "@/components/common/reveal";

export function DonateCta() {
  return (
    <section className="bg-gradient-to-r from-primary to-accent">
      <Reveal className="container-app flex flex-col items-center gap-5 py-16 text-center sm:py-20">
        <h2 className="text-3xl text-white sm:text-4xl">Ready to Make a Difference?</h2>
        <p className="max-w-xl text-base leading-7 text-white/80">
          Your support helps us reach more families across Kalaki District. Every contribution
          moves us closer to lasting change.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href="#payment-form"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Donate Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Need Help? Contact Us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
