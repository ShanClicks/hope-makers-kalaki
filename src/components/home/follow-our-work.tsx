import type { ComponentType } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Reveal } from "@/components/common/reveal";

// TODO: placeholder links — swap for real profile URLs once handles are confirmed.
const PLATFORMS: {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  href: string;
}[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: FaFacebook,
    description: "Community updates, program milestones, and event photos from across Kalaki.",
    href: "#",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    description: "Behind-the-scenes moments and visual stories from our programs.",
    href: "#",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: FaTiktok,
    description: "Short clips capturing the energy and impact of our work in the field.",
    href: "#",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    description: "In-depth videos, interviews, and stories from our programs.",
    href: "#",
  },
];

function ActiveNowDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      Active Now
    </span>
  );
}

export function FollowOurWork() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="w-fit rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            #FollowTheImpact
          </span>
          <h2 className="text-3xl sm:text-4xl">
            See Our Work <span className="text-accent">Unfold</span>
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            Follow real-time updates from the field and connect with the Kalaki community we serve.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Reveal key={platform.id} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon className="size-6" />
                    </span>
                    <ActiveNowDot />
                  </div>
                  <h3 className="text-lg">{platform.name}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{platform.description}</p>
                  <a
                    href={platform.href}
                    className="inline-flex items-center justify-center rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Follow
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          className="mt-12 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-12 text-center sm:px-12"
          delay={0.1}
        >
          <h3 className="text-2xl text-white sm:text-3xl">Stay Connected With Our Mission</h3>
          <p className="max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Follow all our channels to stay close to the stories, milestones, and everyday moments
            from across Kalaki District.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.id}
                  href={platform.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  <Icon className="size-4" />
                  {platform.name}
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
