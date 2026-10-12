import type { Testimonial } from "@/lib/types";

/*
 * Every testimonial, from Google reviews, OzLance and the old site. All are
 * five stars. Quotes are the reviewers' own words, sometimes trimmed with "…".
 * Reviewer names are the ones they published themselves.
 *
 * How reviewers are credited on the site. One switch for all of them, and
 * any single testimonial can override it with `credit`:
 *   "full"     → "Najib Monchizada, Mirrors Cleaning"
 *   "first"    → "Najib, Mirrors Cleaning"
 *   "initial"  → "Najib M, Mirrors Cleaning"
 *   "business" → "Mirrors Cleaning" (falls back to project type)
 *   "none"     → project type only
 */
export const attribution: "full" | "first" | "initial" | "business" | "none" =
  "initial";

/**
 * Shown on the site, in this order. To be chosen in Phase 6 once they can be
 * seen in context; the rest are kept for reference.
 */
export const featuredTestimonialIds = [
  "hoplite",
  "diode-yang",
  "autism-oasis",
  "soongbae",
  "canine-calm-walks",
  "sparkleman",
];

export const testimonials: Testimonial[] = [
  {
    id: "autism-oasis",
    projectType: "Website and social media · WordPress",
    projectSlug: "autism-oasis",
    name: "Chris Browne",
    business: "Autism Oasis",
    source: "Google",
    rating: 5,
    quote:
      "Ben helped me build our new website and social media presence. His expertise, and collaborative nature resulted in a fantastic outcome for our business. We are very pleased, and would thoroughly recommend his services to other small businesses. Thanks Ben!",
  },
  {
    id: "hoplite",
    projectType: "Website maintenance · WordPress",
    projectSlug: "hoplite",
    name: "Sam K",
    business: "Hoplite",
    source: "Google",
    rating: 5,
    quote:
      "Ben is a very professional, highly responsive and honest service provider. I highly recommend him for his services. Nothing was too hard for him, and the cost for his services is very good for the value provided.",
  },
  {
    id: "canine-calm-walks",
    projectType: "React web app and mobile app",
    projectSlug: "canine-calm-walks",
    name: "Sarah Q",
    business: "Canine Calm Walks",
    source: "Google",
    rating: 5,
    quote:
      "We're very grateful for Ben and the ongoing work he has provided for us and our business. He has been instrumental in providing back-end support for our platform, whilst also assisting with research and optimisation of our platform to allow it to operate even better. He is patient, reliable and knowledgable and has been a huge help for us. We've enjoyed working alongside Ben and would highly recommend!",
  },
  {
    id: "soongbae",
    projectType: "Online shop · Squarespace",
    projectSlug: "soongbae",
    name: "Viktoria Halas",
    business: "Soongbae",
    source: "OzLance",
    rating: 5,
    quote:
      "He was very thorough in his research as the problems were not so straightforward and offered many ideas on how to deal with each issue. Throughout the whole process Ben took the time to explain everything to me plainly… He also provided me with a document outlining and explaining the steps he took to resolve the problems with some helpful links and tips for future improvements. I couldn't be happier with the results.",
  },
  {
    id: "diode-yang",
    projectType: "Music showcase website · Wix",
    projectSlug: "diode-yang",
    name: "Graham McBean",
    business: "Diode Yang",
    source: "OzLance",
    rating: 5,
    quote:
      "It was a pleasure working with Ben in creating Diode Yang. Ben quickly got the tone of what I was trying to do and ran with my ideas to create the perfect environment for my work. I found Ben easy to work with. He's affable and agreeable and contactable, which made the workflow go really easy.",
  },
  {
    id: "sparkleman",
    projectType: "Photographer website · WordPress",
    projectSlug: "sparkleman",
    name: "Luke Scarlett",
    business: "Sparkleman",
    source: "OzLance",
    rating: 5,
    quote:
      "Ben has an attention to detail and high communication level second to none. Ben was able to get on top of the tasks provided whilst updating me throughout the process. Having screen grabs allowed me to follow along and this is something I've never had done before and is considered very professional.",
  },
  {
    id: "act-cleaning-by-demand",
    projectType: "Website rescue · HTML/CSS",
    projectSlug: "act-cleaning-by-demand",
    name: "Den K",
    business: "ACT Cleaning by Demand",
    source: "OzLance",
    rating: 5,
    quote:
      "Running a business, have a broken website and you lost your customers and revenues. Ben C has lifted a huge burden to revive my small business. Thanks heaps for your spectacular help.",
  },
  {
    id: "mirrors-cleaning",
    projectType: "Business website · WordPress",
    projectSlug: "mirrors-cleaning",
    name: "Najib Monchizada",
    business: "Mirrors Cleaning",
    source: "OzLance",
    rating: 5,
    quote:
      "I find Ben trustworthy, he reached all my expectations and make all my ideas for my website come to life, amazing value for money and professional service. I highly recommend Ben to any businesses anywhere in Australia.",
  },
  {
    id: "resume-website",
    projectType: "Résumé website · HTML/CSS",
    projectSlug: "resume-website",
    name: "David Car",
    business: "Private Contractor",
    source: "OzLance",
    rating: 5,
    quote:
      "Ben refreshed and updated my website and I am very happy with his quality of work and attentive attitude. I had a few technical challenges that Ben navigated with ease and actioned promptly. I received great value for money.",
  },
  {
    id: "soapponified",
    projectType: "Online shop · Shopify",
    projectSlug: "soapponified",
    name: "Sharon",
    business: "SoapPonified",
    source: "OzLance",
    rating: 5,
    quote:
      "Ben recently sorted out some technical details on my website… He took all the hassle out of getting it done. He was quick, friendly, and did a brilliant job. Would definitely recommend him & his services.",
  },
  {
    id: "piano-relocations",
    projectType: "Business website · WordPress",
    projectSlug: "piano-relocations",
    name: "David Knight",
    business: "Piano Relocations Canberra",
    source: "OzLance",
    rating: 5,
    quote: "Ben was fast, full of ideas and easy to work with.",
  },
  {
    id: "art1-painting",
    projectType: "Business website · GoDaddy",
    projectSlug: "art1-painting",
    name: "Waheed B",
    business: "Art1 Painting",
    source: "Google",
    rating: 5,
    quote: "Thanks Ben I love my website!",
  },
  {
    id: "in-home-barbara",
    projectType: "In-home tech support",
    projectSlug: "in-home-tech-support",
    name: "Barbara MacGregor",
    source: "Google",
    rating: 5,
    quote:
      "I found Ben's help to be prompt, clearly stated, resourceful. He was patient, kind, polite, a pleasure to do business with.",
  },
  {
    id: "in-home-leanne",
    projectType: "Home office tech setup",
    projectSlug: "in-home-tech-support",
    name: "Leanne Shutt",
    source: "OzLance",
    rating: 5,
    quote:
      "I have no hesitation to recommend Ben C for his technical abilities, advise and service. Ben is professional, an excellent problem solver, with very good communication skills.",
  },
];
