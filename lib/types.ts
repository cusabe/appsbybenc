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
