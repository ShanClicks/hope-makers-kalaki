import type { ComponentType } from "react";
import { CheckCircle2, Landmark, Smartphone } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { DonateForm } from "@/components/donate/donate-form";

interface PaymentOption {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  features: string[];
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "mtn",
    name: "MTN Mobile Money",
    icon: Smartphone,
    features: ["Instant processing", "Secure USSD prompt", "Immediate confirmation"],
  },
  {
    id: "airtel",
    name: "Airtel Money",
    icon: Smartphone,
    features: ["Instant processing", "Secure USSD prompt", "Immediate confirmation"],
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Landmark,
    features: ["Best for larger donations", "We email you transfer details", "Confirmed within 1–2 business days"],
  },
];

function AvailableNowBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
      </span>
      Available Now
    </span>
  );
}

export function PaymentMethods() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Choose Your Payment Method</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Donate instantly with mobile money, or arrange a bank transfer for larger gifts.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {PAYMENT_OPTIONS.map((option, index) => {
            const Icon = option.icon;
            return (
              <Reveal key={option.id} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-6" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base">{option.name}</h3>
                    <AvailableNowBadge />
                  </div>
                  <ul className="flex flex-1 flex-col gap-2">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#payment-form"
                    className="inline-flex items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Donate Now
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div id="payment-form" className="mt-16 scroll-mt-24">
          <Reveal>
            <DonateForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
