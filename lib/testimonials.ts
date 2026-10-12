import { site } from "@/content/site";
import {
  attribution,
  featuredTestimonialIds,
  testimonials,
} from "@/content/testimonials";
import type { Testimonial } from "@/lib/types";

/** "Najib Monchizada" → "Najib M" (no full stop); leaves "Sharon" alone. */
function initialed(name: string): string {
  const [first, ...rest] = name.split(" ");
  if (rest.length === 0) return name;
  const last = rest[rest.length - 1];
  return `${first} ${last[0]}`;
}

/**
 * Who a testimonial is credited to, following the site-wide style, split into
 * the person and the business so the business can be styled on its own.
 */
export function creditParts(t: Testimonial): {
  person?: string;
  business?: string;
} {
  if (t.credit) return { person: t.credit };
  if (attribution === "none") return { person: t.projectType };
  if (attribution === "business")
    return t.business ? { business: t.business } : { person: t.projectType };
  const person =
    attribution === "full"
      ? t.name
      : attribution === "first"
        ? t.name?.split(" ")[0]
        : t.name
          ? initialed(t.name)
          : undefined;
  if (!person && !t.business) return { person: t.projectType };
  return { person, business: t.business };
}

/** The public page a review can be checked on. */
export function sourceUrl(t: Testimonial): string | undefined {
  return site.reviews.find((r) => r.label.startsWith(t.source ?? "—"))?.href;
}

/** Featured testimonials first, in their chosen order, then the rest. */
export function orderedTestimonials(): Testimonial[] {
  const featured = featuredTestimonialIds
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t): t is Testimonial => Boolean(t));
  const rest = testimonials.filter(
    (t) => !featuredTestimonialIds.includes(t.id),
  );
  return [...featured, ...rest];
}
