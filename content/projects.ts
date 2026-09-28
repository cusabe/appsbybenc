import type { Project } from "@/lib/types";

/**
 * Case study pages (/work/[slug]) aren't written yet. While this is false the
 * featured cards show no "Read the case study" link. Set to true once the
 * pages exist (deferred Phase 5).
 */
export const caseStudiesPublished = false;

/*
 * All work shown on the site. A project with a `featured` block gets a large
 * card and its own /work/[slug] case study page; the rest appear in the
 * client work grid, in the order listed here.
 *
 * Assembled from the CV, the old appsbybenc.com and the live client sites.
 * Lines marked TODO need Ben's input.
 * No dates anywhere: the site is deliberately timeless.
 */
export const projects: Project[] = [
  // ─── Featured case studies ────────────────────────────────────────────
  {
    slug: "bntrx",
    name: "BnTRx",
    client: "Integra Medical",
    category: "Medtech",
    kind: "product",
    stack: ["React", "Next.js", "Vercel", "Java", "AWS", "SQL"],
    summary:
      "Clinic software for specialist botulinum toxin clinics: patient registration, digital prescriptions, automated re-ordering and stock control.",
    url: "https://bntrx.com.au/",
    image: {
      src: "/images/projects/bntrx.jpg",
      alt: "BnTRx home page: “Streamline, save time”, with a phone showing the app",
    },
    featured: {
      tagline:
        "Led the flagship clinic platform from prototype to production launch.",
      problem:
        "Specialist clinics that administer PBS botulinum toxin were buried in paperwork: patient forms, prescriptions, stock tracking and co-payments, much of it by hand. Integra Medical wanted a platform that removed the paperwork without forcing clinics to rebuild the way they already worked.",
      role: "Software engineer, leading development from the first prototype through to production launch, across the front end, back end and data, working directly with the product team.",
      built: [
        "Patient registration and digital prescription upload",
        "Automated re-ordering, with vial use tabulated for clear stock visibility",
        "Co-payment handling and a stock control system",
        "A React and Next.js front end on Vercel, Java services on AWS, and a SQL database",
        // TODO: confirm which of these features you built or led, and add anything notable.
      ],
      outcome:
        "BnTRx became a revenue-generating commercial product, now used by specialist clinics across Australia.",
      // TODO: add up-to-date figures if you want them.
    },
  },
  {
    slug: "rocket-remit",
    name: "Rocket Remit",
    client: "mHITs",
    category: "Fintech",
    kind: "product",
    stack: ["Angular", "WordPress", "Java", "Groovy/Grails", "AWS", "SQL"],
    summary:
      "A mobile-number money transfer platform. I extended the live platform from Australia and New Zealand into the United Kingdom.",
    url: "https://www.rocketremit.com/",
    image: {
      src: "/images/projects/rocket-remit.jpg",
      alt: "Rocket Remit home page with a rate calculator sending pounds to India",
    },
    featured: {
      tagline:
        "Extended a live remittance platform from Australia and New Zealand to the United Kingdom.",
      problem:
        "Rocket Remit lets people send money overseas instantly using just a mobile number. mHITs wanted to open the United Kingdom market, which meant extending a production financial platform, with real customers and real money moving through it, to a new country without disrupting the existing Australian and New Zealand service.",
      role: "Software engineer on the product team, working across the Angular.js and WordPress front ends and the Java Groovy/Grails back end on AWS.",
      built: [
        "Extended the production platform to serve UK customers alongside Australia and New Zealand",
        "Front-end work in Angular.js and on the WordPress site",
        "Back-end development in Java Groovy/Grails on AWS, with SQL data",
        // TODO: add specifics you can share, e.g. UK onboarding, identity checks, payments or compliance work.
      ],
      outcome:
        "Rocket Remit now serves customers in Australia, New Zealand and the United Kingdom, sending money to more than 70 destinations.",
      // TODO: add anything you can share about the UK launch.
    },
  },
  {
    slug: "mojodojo-music",
    name: "MojoDojo Music",
    category: "Digital startup",
    kind: "product",
    stack: ["React", "Lovable", "Supabase", "Stripe"],
    summary:
      "A studio app for music teachers and students, on the web, iOS and Android. I added a Stripe paywall to the existing AI-built app, leading to a successful launch.",
    url: "https://www.mojodojomusic.com.au/",
    image: {
      src: "/images/projects/mojodojo-music.jpg",
      alt: "MojoDojo app page: “Music teaching made simple”, with App Store, Google Play and web app links",
    },
    featured: {
      tagline:
        "Added a Stripe paywall to an AI-built app and got it to launch.",
      problem:
        "MojoDojo Music had built a React app for music teachers and students using Lovable, an AI app builder, on Supabase. To launch as a business it needed paid access, and AI-generated code can be fragile to extend.",
      role: "Freelance developer, brought in to add payments and get the app launch-ready.",
      built: [
        "A Stripe paywall and subscription flow, integrated into the existing React app",
        "Supabase changes so access follows each user's subscription",
        // TODO: add detail, e.g. webhooks, trials, pricing tiers, testing.
      ],
      outcome: "The app launched successfully with payments in place.",
      // TODO: add anything you can share about the launch.
    },
  },

  // ─── Client work, in display order ────────────────────────────────────
  // With photos first, in sets of three.
  {
    slug: "seekamine",
    name: "Seekamine",
    client: "RifleMedia, via Aquent",
    category: "Mining asset marketplace",
    kind: "product",
    stack: ["WordPress", "PHP", "Stripe", "cPanel"],
    summary:
      "WordPress theme and plugin development, PHP front- and back-end work, Stripe payments, and the sign-up and payment experience for a global marketplace for mining assets.",
    image: {
      src: "/images/projects/seekamine.jpg",
      alt: "Seekamine search page: “Revolutionising the global search for mining assets”",
    },
  },
  {
    slug: "autism-oasis",
    name: "Autism Oasis",
    category: "Disability accommodation",
    kind: "website",
    stack: ["WordPress", "Social media", "SiteGround"],
    summary:
      "A new website and social media presence for a short-term disability accommodation provider in Geelong.",
    url: "https://autismoasis.com.au/",
    image: {
      src: "/images/projects/autism-oasis.jpg",
      alt: "Autism Oasis home page: “Short Term Disability Accommodation in the heart of Geelong”",
    },
  },
  {
    slug: "williamson-electrical",
    name: "Williamson Electrical",
    category: "Electrical and air conditioning",
    kind: "website",
    stack: ["WordPress", "Google Ads", "SiteGround"],
    summary:
      "A WordPress website and Google Ads campaigns for an electrical and air-conditioning business in Geelong.",
    url: "https://williamsonelecair.com.au/",
    image: {
      src: "/images/projects/williamson-electrical.jpg",
      alt: "Williamson Electrical home page: “Reliable electrician services in Geelong, Victoria”",
    },
  },
  {
    slug: "canine-calm-walks",
    name: "Canine Calm Walks",
    category: "Pet-walking marketplace",
    kind: "product",
    stack: ["React", "Node.js", "Stripe", "SendGrid"],
    summary:
      "Maintained and extended a web and mobile marketplace matching dog owners with trained walkers: React front end, Node.js back end, Stripe payments and SendGrid email.",
    image: {
      src: "/images/projects/canine-calm-walks.jpg",
      alt: "Canine Calm Walks home page: “Find trained, trusted and reliable dog walkers in Australia”",
    },
  },
  {
    slug: "hoplite",
    name: "Hoplite",
    category: "Defence recruitment coaching",
    kind: "website",
    stack: ["WordPress", "LMS", "SEO", "HubSpot", "SiteGround"],
    summary:
      "Ongoing care of a WordPress site with a learning management system and community chat boards, plus a site migration, SEO and HubSpot CRM setup.",
    image: {
      src: "/images/projects/hoplite.jpg",
      alt: "Hoplite home page: “Australian Defence Force career? Hoplite is a free service to prepare you”",
    },
  },
  {
    slug: "diode-yang",
    name: "Diode Yang",
    category: "Music showcase",
    kind: "website",
    stack: ["Wix", "SoundCloud", "AWS"],
    summary:
      "A showcase website for a rock opera, built to match the tone of the artist's work, with the music streaming from SoundCloud.",
    url: "https://diodeyang.wixsite.com/diodeyang",
    image: {
      src: "/images/projects/diode-yang.jpg",
      alt: "Diode Yang website with an embedded SoundCloud player",
    },
  },
  {
    slug: "mirrors-cleaning",
    name: "Mirrors Cleaning",
    category: "Property cleaning",
    kind: "website",
    stack: ["WordPress", "cPanel"],
    summary:
      "A business website for a Canberra property cleaning company, built around the owner's ideas.",
    url: "https://www.mirrorscleaning.com.au/",
    image: {
      src: "/images/projects/mirrors-cleaning.jpg",
      alt: "Mirrors Cleaning contact page with the company's star logo",
    },
  },
  {
    slug: "braidwood-ground-spraying",
    name: "Braidwood Ground Spraying",
    category: "Rural services",
    kind: "website",
    stack: ["WordPress", "cPanel"],
    summary:
      "A business website for a ground spraying, heavy haulage and water cartage business near Braidwood.",
    image: {
      src: "/images/projects/braidwood-ground-spraying.jpg",
      alt: "Braidwood Ground Spraying home page showing the company's trucks",
    },
  },
  {
    slug: "act-cleaning-by-demand",
    name: "ACT Cleaning by Demand",
    category: "Commercial cleaning",
    kind: "website",
    stack: ["Bootstrap", "HTML/CSS", "cPanel"],
    summary:
      "Rescued a broken website for a Canberra commercial cleaning business and got customers coming through again.",
    url: "https://actcleaningbydemand.com.au/",
    image: {
      src: "/images/projects/act-cleaning-by-demand.jpg",
      alt: "ACT Cleaning by Demand home page: “Welcome to ACT Cleaning by Demand”",
    },
  },
  {
    slug: "art1-painting",
    name: "Art1 Painting",
    category: "Painting contractor",
    kind: "website",
    stack: ["GoDaddy"],
    summary:
      "A quick business website for a painting company, built on GoDaddy.",
    image: {
      src: "/images/projects/art1-painting.jpg",
      alt: "Art1 Painting logo: a paintbrush sweeping an arc of teal paint under five stars",
    },
  },
  {
    slug: "josa-quick-movers",
    name: "Josa Quick Movers",
    category: "Removalist",
    kind: "website",
    stack: ["WordPress", "Graphic design"],
    summary:
      "WordPress maintenance for a Canberra removalist, plus updating the truck artwork with the right contact details.",
    image: {
      src: "/images/projects/josa-quick-movers.jpg",
      alt: "Removal truck mock-up with the Josa Quick Movers logo on the trailer",
    },
  },
  {
    slug: "thailand-makeover",
    name: "Thailand Makeover",
    category: "Medical travel",
    kind: "website",
    stack: ["WordPress", "Google Ads"],
    summary:
      "A WordPress website and Google Ads for a cosmetic surgery holiday company.",
    url: "https://thailandmakeover.com/",
    image: {
      src: "/images/projects/thailand-makeover.jpg",
      alt: "Thailand Makeover contact page with the company's lotus logo",
    },
  },
  {
    slug: "soongbae",
    name: "Soongbae",
    category: "Online shop",
    kind: "website",
    stack: ["Squarespace"],
    summary:
      "Fixed cosmetic and analytics issues on a Squarespace shop for official and fan-made K-pop goods, with a written guide for the future.",
    image: {
      src: "/images/projects/soongbae.jpg",
      alt: "Soongbae shop home page: “Official and fanmade k-goods”",
    },
  },
  {
    slug: "soapponified",
    name: "SoapPonified",
    category: "Online shop",
    kind: "website",
    stack: ["Shopify"],
    summary: "Technical fixes and branding updates for a handmade soap shop.",
    image: {
      src: "/images/projects/soapponified.jpg",
      alt: "SoapPonified handmade soap bars with the shop's script logo",
    },
  },
  {
    slug: "piano-relocations",
    name: "Piano Relocations Canberra",
    category: "Removals",
    kind: "website",
    stack: ["WordPress"],
    summary:
      "WordPress maintenance for a Canberra piano removals and grand piano hire business, and later the handover of the website when the business was sold.",
    image: {
      src: "/images/projects/piano-relocations.jpg",
      alt: "Piano Relocations Canberra website with a grand piano",
    },
  },
  {
    slug: "resume-website",
    name: "Résumé website",
    category: "Personal website",
    kind: "website",
    stack: ["HTML/CSS", "cPanel"],
    summary:
      "Refreshed and updated a professional's résumé website, working through a few technical challenges along the way.",
    image: {
      src: "/images/projects/resume-website.jpg",
      alt: "Résumé website contact page: “Connect”",
    },
  },
  {
    slug: "eden-2-monaro",
    name: "Eden 2 Monaro Tree Service",
    category: "Graphic design",
    kind: "service",
    stack: ["Graphic design"],
    summary: "Logo design for a tree service, now on its workwear.",
    url: "https://hipages.com.au/connect/eden2monarotreeservice",
    image: {
      src: "/images/projects/eden-2-monaro.jpg",
      alt: "Orange work shirt embroidered with the E2M Tree Services logo",
    },
  },
  {
    slug: "sparkleman",
    name: "Sparkleman",
    category: "Photographer",
    kind: "website",
    stack: ["WordPress"],
    summary:
      "WordPress updates for a photographer's website, with screenshots at every step so the owner could follow along.",
    image: {
      src: "/images/projects/sparkleman.jpg",
      alt: "Interior photograph of a carpeted staircase",
    },
  },
  // Text-only cards last, shown in the compact style. The three short
  // placements have no images or links, so nothing implies I built those
  // companies' websites.
  {
    slug: "resuscitation-australia",
    name: "Resuscitation Australia",
    client: "via Parasol",
    category: "Medical training",
    kind: "product",
    stack: ["LMS", "Zapier"],
    summary:
      "Designed an automated flow to connect a learning management system to the CRM through Zapier for a new certifying agency, from online sign-up through to automated certification.",
  },
  {
    slug: "viva-leisure",
    name: "Viva Leisure",
    category: "Gym chain",
    kind: "product",
    stack: ["AWS", "GraphQL", "React"],
    summary:
      "Back-end development in AWS and GraphQL for a national gym group's head office, plus GraphQL-integrated React front-end work.",
  },
  {
    slug: "repositpower",
    name: "RepositPower",
    category: "Renewable energy tech",
    kind: "product",
    stack: ["GCP", "Data pipelines", "Python", "Java"],
    summary:
      "Prototyped GCP data pipelines (Dataflow, Apache Beam) processing terabyte-scale energy time-series data, and optimised BigTable/HBase schemas, for a summer internship.",
  },
  {
    slug: "sonic-hr",
    name: "Sonic HR",
    category: "IT field services",
    kind: "service",
    stack: ["IT support"],
    summary:
      "Computer hardware technician: on-site diagnostics and support across retail and enterprise clients, including JB Hi-Fi and Bendigo Bank.",
  },
  {
    slug: "boston-consulting-group",
    name: "Boston Consulting Group",
    client: "via AlphaSights",
    category: "Statistical consulting",
    kind: "service",
    stack: ["Statistics"],
    summary:
      "Advised on official statistics methodology as an expert consultant, through AlphaSights' expert network.",
  },
  {
    slug: "in-home-tech-support",
    name: "In-home tech support",
    category: "Home and small office",
    kind: "service",
    stack: ["IT support"],
    summary:
      "Hands-on help at home: setting up home offices, computers, internet and devices, with patient, plain-English explanations.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const clientProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
