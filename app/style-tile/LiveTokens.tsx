"use client";

import { useSyncExternalStore } from "react";

// Re-read tokens whenever the theme changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function useToken(name: string): string {
  return useSyncExternalStore(
    subscribe,
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--${name}`)
        .trim(),
    () => "",
  );
}

function luminance(hex: string): number | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;
  // The CSS minifier may shorten #ffffff to #fff, so expand 3-digit hex.
  const full =
    match[1].length === 3 ? [...match[1]].map((c) => c + c).join("") : match[1];
  const channels = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number | null {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export function Swatch({
  token,
  label,
  role,
}: {
  token: string;
  label: string;
  role: string;
}) {
  const value = useToken(token);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      <div className="h-20" style={{ background: `var(--${token})` }} />
      <div className="space-y-0.5 p-3">
        <p className="text-sm font-semibold">{label}</p>
        <p className="font-mono text-xs text-muted">
          --{token} · {value || "…"}
        </p>
        <p className="text-xs text-muted">{role}</p>
      </div>
    </div>
  );
}

export function ContrastRow({
  fg,
  bg,
  label,
  min = 4.5,
}: {
  fg: string;
  bg: string;
  label: string;
  /** 4.5 for normal text, 3 for large text and focus rings/UI. */
  min?: number;
}) {
  const ratio = contrast(useToken(fg), useToken(bg));
  const pass = ratio !== null && ratio >= min;
  return (
    <tr className="border-t border-border">
      <td className="py-2 pr-3">
        <span
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-sm font-semibold"
          style={{ color: `var(--${fg})`, background: `var(--${bg})` }}
        >
          Aa
        </span>
      </td>
      <td className="py-2 pr-3 text-sm">
        {label}
        <span className="block font-mono text-xs text-muted">
          --{fg} on --{bg}
        </span>
      </td>
      <td className="py-2 pr-3 font-mono text-sm tabular-nums">
        {ratio === null ? "…" : `${ratio.toFixed(2)}:1`}
      </td>
      <td className="py-2 text-sm">
        {ratio === null ? null : pass ? (
          <span className="font-semibold text-slate">✓ Pass ({min}:1)</span>
        ) : (
          <span className="font-semibold text-accent">✗ Below {min}:1</span>
        )}
      </td>
    </tr>
  );
}
