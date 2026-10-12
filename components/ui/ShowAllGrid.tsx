"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { buttonClasses } from "./Button";

/**
 * A three-column grid that shows the first few items and reveals the rest
 * with "Show all", so long lists don't push the rest of the page out of reach.
 * Used by the client work grid and the testimonials.
 */
export function ShowAllGrid({
  items,
  initialCount = 9,
}: {
  /** Pre-rendered items, each with a stable key. */
  items: { key: string; node: ReactNode }[];
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const firstHiddenRef = useRef<HTMLLIElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const shown = expanded ? items : items.slice(0, initialCount);

  function toggle() {
    if (!expanded) {
      setExpanded(true);
      // Move keyboard focus to the first newly revealed item.
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
        id={gridId}
        className="grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((item, i) => (
          <li
            key={item.key}
            ref={i === initialCount ? firstHiddenRef : undefined}
            tabIndex={i === initialCount ? -1 : undefined}
            className="rounded-2xl"
          >
            {item.node}
          </li>
        ))}
      </ul>

      {items.length > initialCount ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={gridId}
            className={buttonClasses("secondary", "px-6 py-3 text-base")}
          >
            {expanded ? "Show fewer" : "Show all"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
