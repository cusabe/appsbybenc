"use client";

import { useState, type ReactNode } from "react";
import { Carousel } from "./Carousel";

type Mode = "featured" | "all";

/**
 * Switches between the featured carousel and a grid of every review. Both
 * are in the page from the start (just hidden), so every quote is readable
 * by search engines and without JavaScript.
 */
export function TestimonialsView({
  slides,
  tiles,
}: {
  slides: { key: string; node: ReactNode }[];
  tiles: { key: string; node: ReactNode }[];
}) {
  const [mode, setMode] = useState<Mode>("featured");

  const option = (value: Mode, text: string) => (
    <button
      type="button"
      aria-pressed={mode === value}
      onClick={() => setMode(value)}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        mode === value
          ? "bg-accent text-accent-contrast shadow-soft"
          : "text-text hover:text-accent"
      }`}
    >
      {text}
    </button>
  );

  return (
    <div className="space-y-8">
      <div
        role="group"
        aria-label="How to show the reviews"
        className="inline-flex rounded-full border border-border bg-surface p-1 shadow-soft"
      >
        {option("featured", "Featured")}
        {option("all", `All reviews (${tiles.length})`)}
      </div>

      <div hidden={mode !== "featured"}>
        <Carousel
          slides={slides}
          label="Featured client reviews"
          active={mode === "featured"}
        />
      </div>

      {/* The tile view sits on the sunset gradient from the style tile. */}
      <div hidden={mode !== "all"} className="rounded-3xl bg-hero p-4 sm:p-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <li key={tile.key}>{tile.node}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
