export type FocusAreaId = "education" | "women" | "youth" | "health";

export interface FocusArea {
  id: FocusAreaId;
  slug: string;
  title: string;
  teaser: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: FocusAreaId;
  summary: string;
  description: string;
  location: string;
  images: string[];
  progress: number;
  goalLabel: string;
  status: "ongoing" | "completed" | "planned";
}

export interface Testimonial {
  id: string;
  name: string;
  program: FocusAreaId;
  portrait: string;
  excerpt: string;
  story: string;
  location: string;
}

export type GalleryCategory = "education" | "women" | "youth" | "healthcare" | "events";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "tall" | "wide" | "normal";
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: string;
  type: "news" | "event";
  eventDate?: string;
  location?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export interface AnnualGrowthDatum {
  year: string;
  beneficiaries: number;
  projects: number;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterFormValues {
  email: string;
}

export type FaqCategory =
  | "Donations & Giving"
  | "Programs & Impact"
  | "Volunteering & Partnerships"
  | "About Us";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}
