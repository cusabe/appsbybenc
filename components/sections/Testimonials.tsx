import { site } from "@/content/site";
import { featuredTestimonialIds } from "@/content/testimonials";
import { orderedTestimonials } from "@/lib/testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  TestimonialCard,
  TestimonialSlide,
} from "@/components/testimonials/parts";
import { TestimonialsView } from "@/components/testimonials/TestimonialsView";

export function Testimonials() {
  const all = orderedTestimonials();
  const featured = all.filter((t) => featuredTestimonialIds.includes(t.id));
  const google = site.reviews.find((r) => r.label.startsWith("Google"));
  const ozlance = site.reviews.find((r) => r.label.startsWith("OzLance"));

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Testimonials" title="What clients say" />
      <TestimonialsView
        slides={featured.map((t) => ({
          key: t.id,
          node: <TestimonialSlide t={t} />,
        }))}
        tiles={all.map((t) => ({
          key: t.id,
          node: <TestimonialCard t={t} />,
        }))}
      />
      {google && ozlance ? (
        <p className="mt-10 text-center text-muted">
          Read the reviews on{" "}
          <a
            href={google.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            Google
          </a>{" "}
          and{" "}
          <a
            href={ozlance.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            OzLance
          </a>
          .
        </p>
      ) : null}
    </Section>
  );
}
