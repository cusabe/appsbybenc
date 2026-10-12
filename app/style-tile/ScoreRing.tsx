/**
 * A Lighthouse-style score ring: green for 90+, orange for 50–89, red below.
 * Colours follow Lighthouse's own so the scores read the way people expect.
 */
export function ScoreRing({ label, value }: { label: string; value: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const tone =
    value >= 90
      ? "text-[#0c8a3e] dark:text-[#4ade80]"
      : value >= 50
        ? "text-[#c25a00] dark:text-[#ffa94d]"
        : "text-[#c62828] dark:text-[#ff8a80]";

  return (
    <figure className="flex flex-col items-center gap-2 text-center">
      <div className={`relative size-24 ${tone}`}>
        <svg
          viewBox="0 0 80 80"
          className="size-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-heading text-2xl font-extrabold">
          {value}
        </span>
      </div>
      <figcaption className="text-sm font-semibold">{label}</figcaption>
    </figure>
  );
}
