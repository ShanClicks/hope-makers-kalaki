export const SITE_CONFIG = {
  name: "Hope Makers Kalaki",
  shortName: "Hope Makers",
  tagline: "Empowering Communities. Transforming Lives.",
  description:
    "To empower communities in Kalaki through education, health, youth and women empowerment, and sustainable livelihoods by holding hands to build lasting solutions.",
  vision:
    "A resilient and empowered Kalaki where every youth, woman, and family lives with dignity, opportunity, and hope.",
  url: "https://www.hopemakerskalaki.org",
  email: "hopemakerskalaki@gmail.com",
  phone: "+256 778 837 518",
  whatsapp: "+256778837518",
  address: "Apaari Trading Center, Kakure Subcounty, Kalaki District, Teso Sub-region, Eastern Uganda",
  mapCoordinates: { lat: 1.839952, lng: 33.366025 },
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
    { label: "Quality Education", href: "/programs/education" },
    { label: "Women Empowerment", href: "/programs/women-empowerment" },
    { label: "Youth Empowerment", href: "/programs/youth-empowerment" },
    { label: "Maternal & Child Health", href: "/programs/maternal-child-healthcare" },
  ],
  resources: [
    { label: "Get Involved", href: "/get-involved" },
    { label: "Donate", href: "/donate" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
