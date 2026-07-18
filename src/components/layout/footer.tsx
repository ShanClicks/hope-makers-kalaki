"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FOOTER_LINKS, SITE_CONFIG } from "@/constants/site";

const SOCIAL_LINKS = [
  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: FaFacebook },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, icon: FaXTwitter },
  { label: "Instagram", href: SITE_CONFIG.social.instagram, icon: FaInstagram },
  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: FaYoutube },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: FaLinkedin },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="border-t-4 border-accent bg-muted/40">
      <div className="container-app grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          {!logoFailed ? (
            <Image
              src="/images/logo.png"
              alt={SITE_CONFIG.name}
              width={200}
              height={200}
              className="h-24 w-auto"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="font-heading text-lg font-bold text-primary">{SITE_CONFIG.shortName}</span>
          )}
          <p className="text-sm leading-6 text-muted-foreground">{SITE_CONFIG.description}</p>
          <div className="flex gap-3 pt-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Programs
          </h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.programs.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Resources
          </h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.resources.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2 text-sm text-foreground/80">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="size-4 shrink-0 text-primary" />
              {SITE_CONFIG.email}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="size-4 shrink-0 text-primary" />
              {SITE_CONFIG.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              {SITE_CONFIG.address}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-app flex flex-col items-center gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
