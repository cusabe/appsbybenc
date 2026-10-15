// Lighthouse results shown on the design system page. Update after re-testing
// (ideally on the live site with PageSpeed Insights: pagespeed.web.dev).

export const lighthouse = {
  measured: "October 2026",
  method:
    "Google Lighthouse, run against the live site (www.appsbybenc.com on Vercel). Mobile simulates a mid-range phone on a slow 4G connection, so its performance score varies a little from run to run (91–96 across three runs; the median is shown).",
  results: [
    {
      device: "Mobile",
      scores: [
        { label: "Performance", value: 96 },
        { label: "Accessibility", value: 100 },
        { label: "Best Practices", value: 100 },
        { label: "SEO", value: 100 },
      ],
    },
    {
      device: "Desktop",
      scores: [
        { label: "Performance", value: 100 },
        { label: "Accessibility", value: 100 },
        { label: "Best Practices", value: 100 },
        { label: "SEO", value: 100 },
      ],
    },
  ],
};
