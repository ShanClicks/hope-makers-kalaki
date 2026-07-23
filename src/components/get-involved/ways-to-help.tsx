import Link from "next/link";
import { ArrowRight, HandHeart, Handshake, Heart, Megaphone } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

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
        {WAYS_TO_HELP.map((way, index) => {
          const Icon = way.icon;
          return (
            <Reveal key={way.id} delay={index * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-xl">{way.title}</h3>
                <p className="flex-1 text-sm leading-6 text-muted-foreground">{way.description}</p>
                <Link
                  href={way.href}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {way.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
