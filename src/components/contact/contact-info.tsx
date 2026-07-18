import type { ComponentType } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SITE_CONFIG } from "@/constants/site";
import { getWhatsAppLink } from "@/lib/utils";

const SOCIAL_LINKS = [
  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: FaFacebook },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, icon: FaXTwitter },
  { label: "Instagram", href: SITE_CONFIG.social.instagram, icon: FaInstagram },
  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: FaYoutube },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: FaLinkedin },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <ContactDetail
          icon={Mail}
          label="Email"
          value={SITE_CONFIG.email}
          href={`mailto:${SITE_CONFIG.email}`}
        />
        <ContactDetail
          icon={Phone}
          label="Phone"
          value={SITE_CONFIG.phone}
          href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
        />
        <ContactDetail
          icon={FaWhatsapp}
          label="WhatsApp"
          value={SITE_CONFIG.whatsapp}
          href={getWhatsAppLink(SITE_CONFIG.whatsapp, `Hello ${SITE_CONFIG.shortName}, I'd like to get in touch.`)}
          external
        />
        <ContactDetail icon={MapPin} label="Address" value={SITE_CONFIG.address} />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-foreground">Follow Us</span>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <span className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="size-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="transition-opacity hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return content;
}
