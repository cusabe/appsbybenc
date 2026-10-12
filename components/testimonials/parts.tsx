import Image from "next/image";
import { getProject } from "@/content/projects";
import { creditParts, sourceUrl } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="tracking-wider text-accent"
    >
      {"★".repeat(rating)}
      <span className="text-border">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

/** Stars and a link to the public review. */
function Rating({ t, className = "" }: { t: Testimonial; className?: string }) {
  const url = sourceUrl(t);
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm ${className}`}>
      {t.rating ? <Stars rating={t.rating} /> : null}
      {t.source && url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          {t.source} review
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </p>
  );
}

/** Credit, project type, stars and a link to the public review. */
function Attribution({
  t,
  large = false,
  ratingClassName = "",
}: {
  t: Testimonial;
  large?: boolean;
  /** Lets the carousel hide the rating here on phones (it moves under the thumbnail). */
  ratingClassName?: string;
}) {
  const { person, business } = creditParts(t);
  return (
    <div className="space-y-1">
      <p className={`text-heading ${large ? "text-lg" : ""}`}>
        {person}
        {person && business ? ", " : null}
        {/* Bold business name: the link back to its card in the work grid. */}
        {business ? <strong className="font-bold">{business}</strong> : null}
      </p>
      <p className="text-sm text-muted">{t.projectType}</p>
      <Rating t={t} className={ratingClassName} />
    </div>
  );
}

function QuoteMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute font-heading leading-none text-peach ${className}`}
    >
      &ldquo;
    </span>
  );
}

/** A testimonial tile, for the "All reviews" grid. */
export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-6 pt-10 shadow-soft">
      <QuoteMark className="top-2 left-5 text-6xl" />
      <blockquote className="flex-1">
        <p className="italic">{t.quote}</p>
      </blockquote>
      <figcaption className="border-t border-border pt-4">
        <Attribution t={t} />
      </figcaption>
    </figure>
  );
}

/**
 * A large carousel slide: the quote across the full width, with a small
 * thumbnail of the project just left of the credit.
 */
export function TestimonialSlide({ t }: { t: Testimonial }) {
  const image = t.projectSlug ? getProject(t.projectSlug)?.image : undefined;
  return (
    <figure className="flex h-full flex-col justify-center gap-6">
      <div className="relative pt-10">
        <QuoteMark className="top-0 -left-1 text-7xl" />
        <blockquote>
          <p className="text-lg leading-relaxed italic sm:text-xl">{t.quote}</p>
        </blockquote>
      </div>
      <figcaption className="flex items-start gap-4 sm:items-center sm:gap-5">
        {image ? (
          <div className="w-28 shrink-0 space-y-2 sm:w-36">
            <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-border shadow-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="144px"
                className="object-cover object-top"
              />
            </div>
            {/* On phones the stars and review link sit under the thumbnail. */}
            <Rating t={t} className="sm:hidden" />
          </div>
        ) : null}
        <Attribution
          t={t}
          large
          ratingClassName={image ? "hidden sm:flex" : ""}
        />
      </figcaption>
    </figure>
  );
}
