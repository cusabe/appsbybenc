/**
 * "BC" monogram placeholder. Swap for the cartoon self-portrait once
 * public/images/logo.png arrives.
 */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-linear-135 from-peach via-coral to-gold font-heading font-extrabold text-ink shadow-soft"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      BC
    </span>
  );
}
