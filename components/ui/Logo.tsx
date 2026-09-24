/**
 * "Ben See" glasses: slate frames, blue eyes glancing towards the brand name.
 * Redrawn as SVG from the original 16px favicon. Frames follow the heading
 * colour, so they switch with the theme. app/icon.svg is the favicon copy.
 */
export function Logo({ width = 44 }: { width?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 40"
      width={width}
      height={(width * 40) / 64}
      className="shrink-0"
    >
      <g fill="var(--heading)">
        <rect x="0" y="0" width="32" height="40" rx="6" />
        <rect x="32" y="0" width="32" height="40" rx="6" />
        <rect x="0" y="0" width="64" height="10" rx="4" />
      </g>
      <g fill="#ffffff">
        <rect x="5" y="9" width="22" height="22" rx="3" />
        <rect x="37" y="9" width="22" height="22" rx="3" />
      </g>
      <g fill="#2f8fea">
        <circle cx="20" cy="20" r="4.5" />
        <circle cx="52" cy="20" r="4.5" />
      </g>
    </svg>
  );
}
