export const SITE_CONFIG = {
  name: "Hope Makers Kalaki",
  shortName: "Hope Makers",
  tagline: "Empowering Communities. Transforming Lives.",
  description:
    "To empower communities in Kalaki through education, health, youth and women empowerment, and sustainable livelihoods by holding hands to build lasting solutions.",
  vision:
    "A resilient and empowered Kalaki where every youth, woman, and family lives with dignity, opportunity, and hope.",
  url: "https://www.hopemakerskalaki.org",
  email: "info@hopemakerskalaki.org",
  phone: "+256 700 000 000",
  whatsapp: "+256778837518",
  address: "Kalaki District, Teso Sub-region, Uganda",
  social: {
    facebook: "https://facebook.com/hopemakerskalaki",
    twitter: "https://twitter.com/hopemakerskalaki",
    instagram: "https://instagram.com/hopemakerskalaki",
    youtube: "https://youtube.com/@hopemakerskalaki",
    linkedin: "https://linkedin.com/company/hopemakerskalaki",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Programs", href: "/programs" },
    { label: "Projects", href: "/projects" },
    { label: "Impact", href: "/impact" },
    { label: "News & Events", href: "/news" },
    { label: "Gallery", href: "/gallery" },
  ],
  programs: [
    { label: "Quality Education", href: "/programs#education" },
    { label: "Women Empowerment", href: "/programs#women" },
    { label: "Youth Empowerment", href: "/programs#youth" },
    { label: "Maternal & Child Health", href: "/programs#health" },
  ],
  resources: [
    { label: "Get Involved", href: "/get-involved" },
    { label: "Donate", href: "/donate" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
