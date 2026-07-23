import type { CoreValue, TeamMember } from "@/types";

export const CORE_VALUES: CoreValue[] = [
  {
    id: "community-first",
    title: "Community First",
    description: "We listen to the people of Kalaki and put their needs first.",
    icon: "Users",
  },
  {
    id: "integrity",
    title: "Integrity",
    description: "We are transparent, honest, and accountable in everything we do.",
    icon: "ShieldCheck",
  },
  {
    id: "hope",
    title: "Hope",
    description: "We believe every person has potential to transform their future.",
    icon: "Sunrise",
  },
  {
    id: "inclusiveness",
    title: "Inclusiveness",
    description: "We serve youth, women, men, and vulnerable families without discrimination.",
    icon: "HeartHandshake",
  },
  {
    id: "partnership",
    title: "Partnership",
    description: 'We believe in collaboration. "Holding Hands, Building Kalaki"',
    icon: "Handshake",
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "We use practical, local solutions to solve local problems.",
    icon: "Lightbulb",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Apitu Mary Jackline",
    role: "Founder",
    photo: "/images/team/founder.jpg",
    bio: "Mary founded Hope Makers Kalaki after making Kalaki her home, driven to build lasting solutions alongside the community she became part of.",
  },
  {
    id: "2",
    name: "Okiror Daniel",
    role: "Programs Director",
    photo: "/images/team/okiror.jpg",
    bio: "Daniel oversees education and youth empowerment programs with a background in social work.",
  },
  {
    id: "3",
    name: "Alieto Naomi",
    role: "Health Team Lead",
    photo: "/images/team/health-lead.jpg",
    bio: "Naomi leads our maternal and child healthcare outreach initiatives across Kalaki District.",
  },
  {
    id: "4",
    name: "Emojong Peter",
    role: "Finance & Operations Manager",
    photo: "/images/team/emojong.jpg",
    bio: "Peter ensures financial transparency and operational efficiency across all our projects.",
  },
];
