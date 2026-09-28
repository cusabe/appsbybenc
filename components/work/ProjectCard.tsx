import Image from "next/image";
import type { Project } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";

/**
 * A card for the client work grid. If the project has a live site, the image
 * opens it in a new tab; otherwise the card looks the same, so the grid never
 * draws attention to sites that are no longer online. Projects without an
 * image get a compact text-only card with a thin sunset stripe instead.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      {project.image ? (
        <CardImage project={project} image={project.image} />
      ) : (
        <div
          aria-hidden="true"
          className="h-1.5 bg-linear-to-r from-peach via-coral to-gold"
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted">
            {project.category}
            {project.client ? ` · ${project.client}` : ""}
          </p>
        </div>
        <p className="text-sm">{project.summary}</p>
        {project.stack.length > 0 ? (
          <ul
            className="mt-auto flex flex-wrap gap-1.5 pt-1"
            aria-label="Tech stack"
          >
            {project.stack.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function CardImage({
  project,
  image,
}: {
  project: Project;
  image: NonNullable<Project["image"]>;
}) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.04]"
    />
  );

  // Every image zooms gently on hover, linked or not, so the grid looks the
  // same either way. Only linked images do anything when clicked.
  return (
    <div className="group/img relative aspect-16/10 overflow-hidden border-b border-border">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the ${project.name} website (opens in a new tab)`}
          className="block h-full focus-visible:outline-offset-[-3px]"
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}
