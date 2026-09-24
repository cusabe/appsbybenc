import type { ReactNode } from "react";
import { Container } from "./Container";

/** A page section that anchor links can target without hiding under the sticky header. */
export function Section({
  id,
  tinted = false,
  children,
}: {
  id: string;
  /** Use the tinted surface colour, for alternating sections. */
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 py-20 sm:py-24 ${tinted ? "bg-surface-2" : ""}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl space-y-3">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro ? <p className="text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
