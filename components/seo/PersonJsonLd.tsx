import { site } from "@/content/site";

/**
 * Structured data telling search engines who the site is about.
 * Name is "Ben C" only, location is the city only.
 */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.jobTitle,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Canberra",
      addressRegion: "ACT",
      addressCountry: "AU",
    },
    sameAs: site.social.filter((l) => l.href).map((l) => l.href),
    worksFor: { "@type": "Organization", name: site.brand, url: site.url },
  };

  return (
    <script
      type="application/ld+json"
      // Static, trusted content from content/site.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
