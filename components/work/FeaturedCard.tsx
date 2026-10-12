import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { caseStudiesPublished } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";

/**
 * A large featured project card. Alternates image side on wide screens.
 * Projects without a screenshot get sunset-gradient card art instead. Once
 * the case study pages exist (caseStudiesPublished), the whole card links to
 * /work/[slug].
 */
export function FeaturedCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const { featured } = project;
  if (!featured) return null;

  const art = project.image ? (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
    />
  ) : (
    <div
      aria-hidden="true"
      className="flex h-full items-end bg-hero p-8 transition-transform duration-500 group-hover:scale-[1.03]"
    >
      <span className="font-heading text-4xl font-extrabold tracking-tight text-heading/80 sm:text-5xl">
        {project.name}
      </span>
    </div>
  );

  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-lifted lg:grid-cols-2">
      <div
        className={`relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-80 ${reverse ? "lg:order-2" : ""}`}
      >
        {project.url ? (
          <a
            href={project.url}
            // Internal pages (like the design system) open in the same tab.
            {...(project.url.startsWith("/")
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={
              project.url.startsWith("/")
                ? `See the ${project.name} design system`
                : `Visit the ${project.name} website (opens in a new tab)`
            }
            // z-10 keeps the picture link above the whole-card case study link.
            className="relative z-10 block h-full focus-visible:outline-offset-[-3px]"
          >
            {art}
          </a>
        ) : (
          art
        )}
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">
          {project.category}
          {project.client ? ` · ${project.client}` : ""}
        </p>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {caseStudiesPublished ? (
            // The whole card is clickable via this link's overlay.
            <Link
              href={`/work/${project.slug}/`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>
        <p className="text-lg">{featured.tagline}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {caseStudiesPublished ? (
          <p className="font-semibold text-accent">
            Read the case study{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
