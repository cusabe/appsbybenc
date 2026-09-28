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

  // Links with an empty href are hidden.
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ben-cusack-b1254b21a/",
    },
    { label: "GitHub", href: "https://github.com/cusabe" },
  ],

  // Shown with the testimonials (Phase 6) as proof the reviews are real.
  reviews: [
    { label: "OzLance", href: "https://ozlance.com.au/profile/cub/worker" },
    { label: "Google Reviews", href: "https://g.co/kgs/Y3xW3F8" },
  ],

  hero: {
    eyebrow: "Canberra, Australia · Open to full-time and contract roles",
    headline: "Hi, I'm Ben C, a full-stack developer in Canberra.",
    subline:
      "I build, deploy and maintain production web apps, including medtech and fintech platforms.",
    primaryCta: { label: "See my work", href: "#work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },

  footer: {
    acknowledgement:
      "I live and work on Ngunnawal Country and pay my respects to Elders past and present.",
    builtWith: "Built with Next.js and Claude Code",
  },
};
