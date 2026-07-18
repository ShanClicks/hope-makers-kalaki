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
    name: "Nakato Esther",
    role: "Executive Director",
    photo: "/images/team/nakato.jpg",
    bio: "Esther has led community development initiatives across Teso sub-region for over 15 years.",
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
    name: "Aciro Miriam",
    role: "Health Programs Lead",
    photo: "/images/team/aciro.jpg",
    bio: "A registered midwife, Miriam leads our maternal and child healthcare outreach initiatives.",
  },
  {
    id: "4",
    name: "Emojong Peter",
    role: "Finance & Operations Manager",
    photo: "/images/team/emojong.jpg",
    bio: "Peter ensures financial transparency and operational efficiency across all our projects.",
  },
];
