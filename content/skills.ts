import type { SkillGroup } from "@/lib/types";

// DRAFT (for Phase 6), from the brief and CV. Grouped tags, no skill bars.
export const skillGroups: SkillGroup[] = [
  {
    title: "Front end",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
    ],
  },
  {
    title: "Back end",
    items: [
      "Node.js",
      "Java",
      "PHP",
      "Python",
      "REST APIs",
      "GraphQL",
      "SQL and NoSQL",
      "Stripe",
    ],
  },
  {
    title: "Cloud & infrastructure",
    items: ["AWS", "GCP", "Vercel", "Git", "CI/CD"],
  },
  {
    title: "AI-assisted development",
    items: ["Claude Code", "Directing AI coding agents"],
  },
  {
    title: "Website platforms",
    items: ["WordPress", "Shopify", "Squarespace", "Wix", "Bootstrap"],
  },
  {
    title: "Data",
    items: [
      "Statistical analysis",
      "Survey design",
      "Data pipelines",
      "Reporting",
    ],
  },
  {
    title: "Client & product",
    items: [
      "UX design",
      "Requirements gathering",
      "Testing",
      "Stakeholder engagement",
    ],
  },
];
