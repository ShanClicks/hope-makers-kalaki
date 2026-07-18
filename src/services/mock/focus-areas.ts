import type { FocusArea } from "@/types";

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: "education",
    title: "Access to Quality Education",
    description:
      "We build classrooms, train teachers, and provide scholastic materials so every child in Kalaki has the chance to learn and thrive.",
    icon: "BookOpen",
    href: "/programs#education",
    gradient: "from-[#0057B8] to-[#3B82F6]",
  },
  {
    id: "women",
    title: "Women Empowerment",
    description:
      "Through vocational training, savings groups, and micro-enterprise support, we help women build sustainable livelihoods.",
    icon: "Users",
    href: "/programs#women",
    gradient: "from-[#D62828] to-[#F4735E]",
  },
  {
    id: "youth",
    title: "Youth Empowerment",
    description:
      "We equip young people with vocational skills, mentorship, and entrepreneurship training to unlock their full potential.",
    icon: "Sparkles",
    href: "/programs#youth",
    gradient: "from-[#102A43] to-[#0057B8]",
  },
  {
    id: "health",
    title: "Maternal & Child Healthcare",
    description:
      "Our health outreach programs connect mothers and children to prenatal care, nutrition support, and lifesaving services.",
    icon: "HeartPulse",
    href: "/programs#health",
    gradient: "from-[#0057B8] to-[#D62828]",
  },
];
