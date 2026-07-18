import type { AnnualGrowthDatum, ChartDatum, ImpactStat } from "@/types";

export const IMPACT_STATS: ImpactStat[] = [
  { id: "children", label: "Children Supported", value: 4820, suffix: "+", icon: "BookOpen" },
  { id: "women", label: "Women Empowered", value: 2150, suffix: "+", icon: "Users" },
  { id: "youth", label: "Youth Trained", value: 1690, suffix: "+", icon: "Sparkles" },
  { id: "mothers", label: "Mothers Reached", value: 3340, suffix: "+", icon: "HeartPulse" },
  { id: "communities", label: "Communities Served", value: 38, suffix: "", icon: "MapPin" },
  { id: "projects", label: "Active Projects", value: 24, suffix: "", icon: "Rocket" },
];

export const BENEFICIARY_DISTRIBUTION: ChartDatum[] = [
  { label: "Education", value: 4820 },
  { label: "Women", value: 2150 },
  { label: "Youth", value: 1690 },
  { label: "Health", value: 3340 },
];

export const PROGRAM_DISTRIBUTION: ChartDatum[] = [
  { label: "Education", value: 38 },
  { label: "Women Empowerment", value: 22 },
  { label: "Youth Empowerment", value: 18 },
  { label: "Maternal & Child Health", value: 22 },
];

export const ANNUAL_GROWTH: AnnualGrowthDatum[] = [
  { year: "2020", beneficiaries: 1800, projects: 6 },
  { year: "2021", beneficiaries: 3200, projects: 10 },
  { year: "2022", beneficiaries: 5400, projects: 14 },
  { year: "2023", beneficiaries: 7900, projects: 18 },
  { year: "2024", beneficiaries: 10100, projects: 21 },
  { year: "2025", beneficiaries: 12000, projects: 24 },
];
