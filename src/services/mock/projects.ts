import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "kalaki-model-farm",
    title: "Hope Makers Kalaki Model Farm",
    category: "women",
    summary:
      "A demonstration farm raising pigs, goats, and cattle to build sustainable livelihoods and teach modern, income-generating farming skills to the community.",
    description:
      "The Hope Makers Kalaki Model Farm combines piggery, goat keeping, and cattle rearing to create a sustainable source of income and a hands-on training ground for community members looking to build their own livestock enterprises. Our goal is to help 100 farmers get started with 2 piglets each, and 50 goat farmers with 1 goat each, to build sustainable livestock enterprises across Kalaki.",
    location: "Kalaki District",
    images: [
      "/images/projects/model-farm/piglets.png",
      "/images/projects/model-farm/cattle.png",
      "/images/projects/model-farm/farm-pen.png",
    ],
    progress: 0,
    goalLabel: "$20,000 target",
    status: "ongoing",
  },
  {
    id: "2",
    slug: "kalaki-sacco",
    title: "Hope Makers Kalaki SACCO",
    category: "women",
    summary:
      "A savings and credit cooperative helping community members build financial resilience through group savings and access to affordable credit.",
    description:
      "Our Savings and Credit Cooperative Organization (SACCO) gives community members a safe place to save together and borrow affordably, strengthening financial independence and supporting small business growth across Kalaki. Youth can borrow at 5% interest for a 6-month term (one farming season), with Hope Makers Kalaki supervising and training each chosen venture to promote financial literacy and accountability.",
    location: "Kalaki District",
    images: [
      "/images/projects/sacco/sacco.png",
      "/images/projects/sacco/sample.png",
      "/images/projects/sacco/shade.png",
    ],
    progress: 0,
    goalLabel: "$10,000 target",
    status: "ongoing",
  },
  {
    id: "3",
    slug: "menstrual-hygiene-reusable-pads",
    title: "Menstrual Hygiene Initiative",
    category: "education",
    summary:
      "Producing and distributing reusable sanitary pads so girls and women can manage menstrual health with dignity, without missing school or work.",
    description:
      "Through this initiative, we make and distribute reusable sanitary pads to girls and women across Kalaki, helping remove a major barrier to school attendance and daily life while promoting menstrual health education. Our goal is to provide 4,500 reusable pads to 1,500 teenage school-going girls across Kakure Subcounty schools.",
    location: "Kalaki District",
    images: [
      "/images/projects/menstrual-hygiene/craft.png",
      "/images/projects/menstrual-hygiene/menstraul.png",
      "/images/projects/menstrual-hygiene/menstrual-hygiene.png",
    ],
    progress: 0,
    goalLabel: "$3,500 target",
    status: "ongoing",
  },
  {
    id: "4",
    slug: "child-maternal-care",
    title: "Child & Maternal Care",
    category: "health",
    summary:
      "Supporting the health and wellbeing of mothers and children through community-based care, guidance, and access to essential health services.",
    description:
      "Our child and maternal care program supports mothers and children across Kalaki with community-based health support, helping families access the care they need to keep mothers and children healthy.",
    location: "Kalaki District",
    images: [
      "/images/projects/maternal-care/immunity.png",
      "/images/projects/maternal-care/kit.jpg",
      "/images/projects/maternal-care/sensitization.jpg",
    ],
    progress: 0,
    goalLabel: "Funding goal: TBD",
    status: "ongoing",
  },
  {
    id: "5",
    slug: "quality-education",
    title: "Access to Quality Education",
    category: "education",
    summary:
      "Supporting learners across Kalaki with resources, health education, mentorship, scholarships, and safe classroom space to stay in school.",
    description:
      "Supporting learners across Kalaki with resources, health education, stay-in-school campaigns, mentorship, and scholarships — including building safe, adequate classroom space so every child has room to learn.",
    location: "Kalaki Town Council",
    images: [
      "/images/projects/educ/mass.png",
      "/images/projects/educ/class.png",
      "/images/projects/educ/tree.png",
    ],
    progress: 13,
    goalLabel: "UGX 180M goal",
    status: "ongoing",
  },
];
