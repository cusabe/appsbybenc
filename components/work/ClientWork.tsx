"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { buttonClasses } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";

/** How many cards show before "Show more". Three full rows on desktop. */
const INITIAL_COUNT = 9;

/**
 * The client work grid. Shows the first few projects and reveals the rest on
 * request, so the page stays short enough that visitors reach the
 * testimonials and contact form.
 */
export function ClientWork({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const firstHiddenRef = useRef<HTMLLIElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const hiddenCount = projects.length - INITIAL_COUNT;
  const shown = expanded ? projects : projects.slice(0, INITIAL_COUNT);

  function toggle() {
    if (!expanded) {
      setExpanded(true);
      // Move keyboard focus to the first newly revealed card.
      requestAnimationFrame(() => firstHiddenRef.current?.focus());
    } else {
      setExpanded(false);
      gridRef.current?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div className="space-y-10">
      <ul
        ref={gridRef}
        id="client-work-grid"
        className="grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((project, i) => (
          <li
            key={project.slug}
            ref={i === INITIAL_COUNT ? firstHiddenRef : undefined}
            tabIndex={i === INITIAL_COUNT ? -1 : undefined}
            className="rounded-2xl"
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {hiddenCount > 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="client-work-grid"
            className={buttonClasses("secondary", "px-6 py-3 text-base")}
          >
            {expanded ? "Show fewer" : "Show all"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
