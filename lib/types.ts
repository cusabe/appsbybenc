// Content types. Edit the data in /content; these shapes keep it consistent.

export interface LinkItem {
  label: string;
  href: string;
}

export interface SiteContent {
  /** The owner's public name: "Ben C". */
  name: string;
  brand: string;
  location: string;
  description: string;
  nav: LinkItem[];
  /** External profiles. Entries with an empty href are hidden. */
  social: LinkItem[];
  /** Independent review sources that back up the testimonials. */
  reviews: LinkItem[];
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
  };
  footer: {
    acknowledgement: string;
    builtWith: string;
  };
}

/**
 * Technologies shown as tags and used by the work filter. Keeping them in one
 * list means a typo like "Nextjs" is a compile error, not a stray filter.
 */
export const stackTags = [
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "Java",
  "Groovy/Grails",
  "PHP",
  "Python",
  "GraphQL",
  "SQL",
  "AWS",
  "GCP",
  "Vercel",
  "Supabase",
  "Lovable",
  "SendGrid",
  "SoundCloud",
  "Stripe",
  "WordPress",
  "WooCommerce",
  "Wix",
  "Shopify",
  "Squarespace",
  "GoDaddy",
  "cPanel",
  "SiteGround",
  "HTML/CSS",
  "Bootstrap",
  "LMS",
  "Zapier",
  "HubSpot",
  "SEO",
  "Google Ads",
  "Data pipelines",
  "Graphic design",
  "Social media",
  "Statistics",
  "IT support",
] as const;

export type StackTag = (typeof stackTags)[number];

export interface ImageRef {
  /** Path under /public, e.g. "/images/projects/bntrx.jpg". */
  src: string;
  alt: string;
}

/** The extra detail that turns a project into a featured case study page. */
export interface CaseStudy {
  /** One-line hook for the featured card. */
  tagline: string;
  problem: string;
  role: string;
  built: string[];
  outcome: string;
  testimonialId?: string;
}

export interface Project {
  /** URL-safe id, e.g. "rocket-remit". Also the case study URL. */
  slug: string;
  name: string;
  client?: string;
  /** Short type label, e.g. "Medtech" or "Small-business website". */
  category: string;
  /** Product and contract work, small-business websites, or other services. */
  kind: "product" | "website" | "service";
  stack: StackTag[];
  /** One or two sentences for the card. */
  summary: string;
  /**
   * Live site, opened by clicking the card image. Leave out if the site is
   * gone, or if it isn't my work to show. No dates: the site is timeless.
   */
  url?: string;
  image?: ImageRef;
  /** Present → large featured card plus a /work/[slug] page. */
  featured?: CaseStudy;
}

export interface Testimonial {
  id: string;
  quote: string;
  /** Always shown, e.g. "Business website · WordPress". */
  projectType: string;
  /** Links the quote to a project card, if there is one. */
  projectSlug?: string;
  /** Reviewer details. Shown according to `attribution` (see testimonials.ts). */
  name?: string;
  business?: string;
  /** Where the review is publicly posted, if anywhere. */
  source?: "Google" | "OzLance" | "Direct";
  /** Overrides the site-wide attribution style for this one testimonial. */
  credit?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}
