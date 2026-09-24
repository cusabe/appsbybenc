import type { SiteContent } from "@/lib/types";

export const site: SiteContent = {
  name: "Ben C",
  brand: "Apps by Ben C",
  location: "Canberra, Australia",
  description:
    "Ben C, a full-stack web and software developer in Canberra, Australia.",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/#contact" },
  ],

  // TODO: add profile URLs. Links with an empty href are hidden.
  social: [
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],

  hero: {
    eyebrow: "Canberra, Australia · Open to full-time and contract roles",
    headline: "Hi, I'm Ben C, a full-stack developer in Canberra.",
    subline:
      "I build and ship production web apps, from medtech and fintech platforms to small-business websites that just work.",
    primaryCta: { label: "See my work", href: "#work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },

  footer: {
    acknowledgement:
      "I live and work on Ngunnawal Country and pay my respects to Elders past and present.",
    builtWith: "Built with Next.js and Claude Code",
  },
};
