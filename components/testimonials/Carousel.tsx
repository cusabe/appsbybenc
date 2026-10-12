"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * A swipeable carousel built on CSS scroll-snap that wraps around in both
 * directions. The track holds a copy of the last slide before the first and a
 * copy of the first after the last; when a swipe lands on a copy, the track
 * jumps instantly to the real slide, so 6 → 1 and 1 → 6 feel seamless.
 *
 * Auto-advances slowly (every 30 seconds by default), pausing while the
 * visitor hovers over it or uses it with the keyboard, and never for people
 * who prefer reduced motion. A pause/play button keeps it accessible.
 */
export function Carousel({
  slides,
  label,
  intervalMs = 30_000,
  active = true,
}: {
  slides: { key: string; node: ReactNode }[];
  label: string;
  intervalMs?: number;
  /** False while the carousel is hidden (e.g. the tile view is showing). */
  active?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | undefined>(undefined);
  const [index, setIndex] = useState(0); // the real slide, 0-based
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useReducedMotion();
  const autoplay = active && playing && !interacting && !reducedMotion;
  const count = slides.length;

  // Track positions: 0 = copy of last, 1..count = real slides, count+1 = copy of first.
  const scrollToPosition = useCallback(
    (position: number, smooth: boolean) => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      track.scrollTo({
        left: position * track.clientWidth,
        behavior: smooth && !reducedMotion ? "smooth" : "auto",
      });
    },
    [reducedMotion],
  );

  function goTo(realIndex: number) {
    // Allowed to step onto a copy (-1 or count); onScroll then wraps it.
    scrollToPosition(realIndex + 1, true);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const position = Math.round(track.scrollLeft / track.clientWidth);
    setIndex((((position - 1) % count) + count) % count);

    // Once scrolling settles on a copy, jump to the matching real slide.
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const settled = Math.round(track.scrollLeft / track.clientWidth);
      if (settled === 0) scrollToPosition(count, false);
      else if (settled === count + 1) scrollToPosition(1, false);
    }, 120);
  }

  // Start on the first real slide, and restore the position whenever the
  // carousel becomes visible again or the window is resized.
  useLayoutEffect(() => {
    if (active) scrollToPosition(index + 1, false);
    // Only re-run when visibility changes, not on every slide change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, scrollToPosition]);

  useEffect(() => {
    function onResize() {
      scrollToPosition(index + 1, false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToPosition]);

  // Auto-advance. Any change of slide restarts the timer.
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => goTo(index + 1), intervalMs);
    return () => window.clearTimeout(id);
    // goTo only reads refs and props, so it doesn't need to be a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, index, intervalMs]);

  const arrow =
    "size-9 items-center justify-center rounded-full border border-border bg-surface/90 text-text shadow-soft transition-colors hover:border-accent hover:text-accent sm:size-10";

  const trackSlides = [
    { key: "clone-last", node: slides[count - 1].node, clone: true },
    ...slides.map((s) => ({ ...s, clone: false })),
    { key: "clone-first", node: slides[0].node, clone: true },
  ];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="space-y-6"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          aria-live={autoplay ? "off" : "polite"}
          // relative: keeps absolutely positioned bits (screen-reader labels)
          // inside the scroll area, so hidden slides can't widen the page.
          className="relative scrollbar-none flex snap-x snap-mandatory overflow-x-auto rounded-3xl border border-border bg-quote shadow-soft focus-visible:outline-offset-4"
        >
          {trackSlides.map((slide, i) => (
            <div
              key={slide.key}
              role={slide.clone ? undefined : "group"}
              aria-roledescription={slide.clone ? undefined : "slide"}
              aria-label={slide.clone ? undefined : `${i} of ${count}`}
              aria-hidden={slide.clone || undefined}
              inert={slide.clone || undefined}
              className="w-full shrink-0 snap-start px-12 py-8 sm:p-10 md:px-14"
            >
              {slide.node}
            </div>
          ))}
        </div>

        {/* On phones the arrows sit on the carousel itself. */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous review"
          className={`${arrow} absolute top-1/2 left-1.5 inline-flex -translate-y-1/2 md:hidden`}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next review"
          className={`${arrow} absolute top-1/2 right-1.5 inline-flex -translate-y-1/2 md:hidden`}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous review"
          className={`${arrow} hidden md:inline-flex`}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="flex items-center">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              // A 24px tap area around a small visible dot.
              className="group/dot grid h-6 min-w-6 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-accent"
                    : "w-2.5 bg-border group-hover/dot:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next review"
          className={`${arrow} hidden md:inline-flex`}
        >
          <span aria-hidden="true">›</span>
        </button>

        {!reducedMotion ? (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause auto-play" : "Start auto-play"}
            className={`${arrow} inline-flex`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
            >
              {playing ? (
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              ) : (
                <path d="M8 5.5v13l11-6.5z" />
              )}
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
