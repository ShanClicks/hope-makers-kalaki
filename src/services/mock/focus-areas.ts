import type { FocusArea } from "@/types";

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: "education",
    slug: "education",
    title: "Access to Quality Education",
    teaser: "Supporting learners with resources, health education, mentorship, and scholarships to stay in school.",
    description:
      "We support learners with resources, health education, stay-in-school campaigns, mentorship programs, and scholarships. We provide school supplies and materials that remove basic barriers to attending class, alongside in-school health education sessions on hygiene and wellbeing that keep pupils healthy enough to attend consistently. Our stay-in-school campaigns take on the leading causes of dropout in the region: early pregnancy, early marriage, and household poverty pressures. Through mentorship programs, we connect pupils with mentors who model a path through to completion, and through scholarships, we offer direct financial support to learners at risk of dropping out due to school fees.",
    icon: "BookOpen",
    href: "/programs/education",
    gradient: "from-[#0057B8] to-[#3B82F6]",
  },
  {
    id: "women",
    slug: "women-empowerment",
    title: "Women Empowerment",
    teaser: "Helping women build sustainable livelihoods through training, savings groups, and enterprise support.",
    description:
      "We believe every woman in Kalaki deserves the tools to build a life of her own choosing. Through vocational training, savings groups, and micro-enterprise support, we help women turn skill and community into lasting income. Our vocational training equips women with practical trade and craft skills they can turn into steady work, while community-based savings groups build the financial independence and resilience to weather hard seasons. Alongside this, we offer hands-on guidance and small-scale support to women starting income-generating ventures of their own, so opportunity in Kalaki isn't something women wait for, but something they build.",
    icon: "Users",
    href: "/programs/women-empowerment",
    gradient: "from-[#D62828] to-[#F4735E]",
  },
  {
    id: "youth",
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    teaser: "Equipping young people with financial literacy, skilling, and modern farming practices.",
    description:
      "We equip young people with financial literacy, skilling, modern income-generating farming practices, and sensitization about family setup. Our financial literacy training gives youth practical skills in saving, budgeting, and responsible borrowing, tied directly into our SACCO program. Through skilling, we open up vocational and trade opportunities beyond subsistence farming, while our Model Farm teaches modern, income-generating agricultural techniques. Alongside this, we lead community conversations on family setup, addressing the same root causes behind youth dropping out of school and opportunity.",
    icon: "Sparkles",
    href: "/programs/youth-empowerment",
    gradient: "from-[#102A43] to-[#0057B8]",
  },
  {
    id: "health",
    slug: "maternal-child-healthcare",
    title: "Maternal & Child Healthcare",
    teaser: "Connecting mothers and children to prenatal care, nutrition, and lifesaving health services.",
    description:
      "Our health outreach programs bring essential care to Kalaki's most underserved communities, connecting mothers, children, and families to prenatal care, nutrition support, and lifesaving health services. We help expecting mothers access prenatal care they would otherwise have to travel far to reach, address child and maternal malnutrition, and tackle everyday health challenges that limited access leaves unmet. Through outreach and mobile support, we bring lifesaving health services directly into Kalaki's remote areas, reaching families who would otherwise go without.",
    icon: "HeartPulse",
    href: "/programs/maternal-child-healthcare",
    gradient: "from-[#0057B8] to-[#D62828]",
  },
];
