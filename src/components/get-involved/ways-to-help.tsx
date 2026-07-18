import Link from "next/link";
import { ArrowRight, HandHeart, Handshake, Heart, Megaphone } from "lucide-react";

const WAYS_TO_HELP = [
  {
    id: "donate",
    icon: Heart,
    title: "Donate",
    description:
      "A financial gift, big or small, goes directly toward our education, women's empowerment, youth, and healthcare programs.",
    href: "/donate",
    cta: "Donate Now",
  },
  {
    id: "volunteer",
    icon: HandHeart,
    title: "Volunteer",
    description:
      "Share your time and skills alongside our team, whether locally in Kalaki or remotely with specialized expertise.",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Organizations, businesses, and institutions can partner with us to expand the reach and sustainability of our programs.",
    href: "/contact",
    cta: "Start a Conversation",
  },
  {
    id: "spread-the-word",
    icon: Megaphone,
    title: "Spread the Word",
    description:
      "Follow us on social media and share our work with your network — awareness helps us reach more people who can support our mission.",
    href: "/contact",
    cta: "Contact Us",
  },
];

export function WaysToHelp() {
  return (
    <section className="container-app py-16 sm:py-20">
      <div className="grid gap-6 sm:grid-cols-2">
        {WAYS_TO_HELP.map((way) => {
          const Icon = way.icon;
          return (
            <div
              key={way.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="text-xl">{way.title}</h3>
              <p className="flex-1 text-sm leading-6 text-muted-foreground">{way.description}</p>
              <Link
                href={way.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-royal-dark"
              >
                {way.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
