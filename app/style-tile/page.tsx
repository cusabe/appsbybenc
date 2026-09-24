import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { fontPairs, type FontStatus } from "./fonts";
import { ContrastRow, Swatch } from "./LiveTokens";

// Design playground. Kept as part of a future "How I built this" section.
// noindex until it is written up for visitors.
export const metadata: Metadata = {
  title: "Style tile · Apps by Ben C",
  robots: { index: false, follow: false },
};

const swatches = [
  { token: "bg", label: "Background", role: "Page background" },
  { token: "surface", label: "Surface", role: "Cards" },
  { token: "surface-2", label: "Surface 2", role: "Tinted panels, tags" },
  { token: "text", label: "Text", role: "Body text (cloud charcoal)" },
  { token: "heading", label: "Heading", role: "h1–h4 (slate)" },
  { token: "muted", label: "Muted", role: "Secondary text" },
  { token: "border", label: "Border", role: "Lines and outlines" },
  { token: "accent", label: "Accent", role: "Links, buttons, focus" },
  { token: "slate", label: "Slate", role: "Sky blue-grey; text-safe" },
  { token: "peach", label: "Peach", role: "Decoration only" },
  { token: "coral", label: "Coral", role: "Decoration only" },
  { token: "gold", label: "Gold", role: "Decoration only" },
];

const statusLabel: Record<FontStatus, string> = {
  chosen: "✓ Chosen",
  candidate: "New candidate",
  considered: "Considered",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-5 border-t border-border py-10">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleTile() {
  return (
    <div className="py-10">
      <Container>
        <header className="flex flex-wrap items-start justify-between gap-4 pb-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">
              Phase 2 · Design playground
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Ngunnawal Skies style tile
            </h1>
            <p className="max-w-2xl text-muted">
              Every colour, font and building block in one place. Flip the theme
              with the toggle in the header. Colours live in{" "}
              <code className="font-mono text-sm">app/globals.css</code>; edit a
              hex, save, and refresh to see the swatches and contrast ratios
              update.
            </p>
            <Link href="/" className="text-sm font-semibold text-accent">
              ← Home
            </Link>
          </div>
        </header>

        <Section title="Hero styles">
          <p className="max-w-2xl text-sm text-muted">
            The home page hero uses the photo, zoomed in on the coral streaks.
            The footer shows the same photo as a wide panorama. The pure-CSS
            gradient is kept for card art and anywhere a photo would be too
            busy.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative isolate flex min-h-72 flex-col justify-center gap-4 overflow-hidden rounded-3xl border border-border p-8 shadow-soft">
              <Image
                src="/images/ngunnawal-skies.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-10 scale-110 object-cover object-[center_45%]"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-r from-bg from-25% via-bg/70 to-transparent" />
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                In use · Home page hero
              </p>
              <h3 className="max-w-sm text-3xl font-bold tracking-tight">
                Hi, I&apos;m Ben C, a full-stack developer in Canberra.
              </h3>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#">See my work</ButtonLink>
                <ButtonLink href="#" variant="secondary">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
            <div className="flex min-h-72 flex-col justify-center gap-4 rounded-3xl border border-border bg-hero p-8 shadow-soft">
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                Pure CSS gradient
              </p>
              <h3 className="text-3xl font-bold tracking-tight">
                The same sky, drawn in CSS
              </h3>
              <p className="max-w-md">
                Cream to peach to coral-pink to gold, taken from the photo.
                Crisp at any size, and weighs nothing.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Colours">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>
        </Section>

        <Section title="Contrast checks (WCAG AA)">
          <p className="max-w-2xl text-sm text-muted">
            Normal text needs 4.5:1. Large text, focus rings and UI outlines
            need 3:1. Peach is expected to fail; that&apos;s why it&apos;s
            decoration only.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left">
              <tbody>
                <ContrastRow fg="text" bg="bg" label="Body text" />
                <ContrastRow fg="heading" bg="bg" label="Headings (h1–h4)" />
                <ContrastRow
                  fg="text"
                  bg="surface-2"
                  label="Text on tinted panel"
                />
                <ContrastRow fg="muted" bg="bg" label="Muted text" />
                <ContrastRow
                  fg="muted"
                  bg="surface-2"
                  label="Muted on tinted panel"
                />
                <ContrastRow fg="accent" bg="bg" label="Links" />
                <ContrastRow fg="accent" bg="surface" label="Links on cards" />
                <ContrastRow
                  fg="accent-contrast"
                  bg="accent"
                  label="Button text"
                />
                <ContrastRow fg="slate" bg="bg" label="Slate text" />
                <ContrastRow fg="accent" bg="bg" label="Focus ring" min={3} />
                <ContrastRow fg="peach" bg="bg" label="Peach as text (don't)" />
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">Heading 1</h1>
            <h2 className="text-3xl font-bold tracking-tight">Heading 2</h2>
            <h3 className="text-xl font-semibold">Heading 3</h3>
            <p className="max-w-prose text-lg">
              Lead paragraph. I build and ship production web apps, from medtech
              and fintech platforms to small-business websites that just work.
            </p>
            <p className="max-w-prose">
              Body text. Before becoming a developer, I spent 15 years in
              research, from theoretical physics to{" "}
              <a
                href="#"
                className="font-medium text-accent underline underline-offset-4"
              >
                gravitational-wave publications
              </a>{" "}
              and national statistics.
            </p>
            <p className="text-sm text-muted">
              Small muted text, for captions and metadata.
            </p>
          </div>
        </Section>

        <Section title="Font pairs">
          <p className="max-w-2xl text-sm text-muted">
            Every pairing tried so far, with the reason it did or didn&apos;t
            make the cut.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {fontPairs.map((pair) => (
              <div
                key={pair.name}
                className={`space-y-3 rounded-2xl border bg-surface p-5 shadow-soft ${pair.status === "chosen" ? "border-accent ring-1 ring-accent" : "border-border"}`}
              >
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                  {pair.name}
                </p>
                <p className="text-xs font-semibold text-accent">
                  {statusLabel[pair.status]}
                </p>
                <p
                  className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: pair.heading }}
                >
                  Full-stack developer in Canberra
                </p>
                <p style={{ fontFamily: pair.body }}>
                  I build and ship production web apps, from medtech and fintech
                  platforms to small-business websites that just work.
                </p>
                <p className="text-sm text-muted">{pair.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Buttons, links and focus">
          <p className="text-sm text-muted">
            Press Tab to move through these and check the focus ring.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost link</Button>
            <Button disabled>Disabled</Button>
            <a
              href="#"
              className="font-medium text-accent underline underline-offset-4"
            >
              Inline link
            </a>
          </div>
        </Section>

        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Java",
              "AWS",
              "WordPress",
              "Stripe",
            ].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="group overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-lifted lg:col-span-2">
              <div className="h-40 bg-hero" />
              <div className="space-y-3 p-6">
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Medtech · Featured case study
                </p>
                <h3 className="text-2xl font-bold tracking-tight">
                  BnTRx, Integra Medical
                </h3>
                <p className="text-muted">
                  Led development of the flagship product from prototype through
                  production launch.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Tag>Next.js</Tag>
                  <Tag>Java</Tag>
                  <Tag>AWS</Tag>
                </div>
                <p className="font-semibold text-accent">Read case study →</p>
              </div>
            </article>
            <article className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">Canine Calm Walks</h3>
                <span className="text-sm text-muted">2024</span>
              </div>
              <p className="text-sm text-muted">Pet-walking marketplace</p>
              <div className="flex flex-wrap gap-2">
                <Tag>React</Tag>
                <Tag>Node.js</Tag>
                <Tag>Stripe</Tag>
              </div>
              <p className="text-sm font-semibold text-accent">Visit site ↗</p>
            </article>
            <div className="rounded-2xl bg-surface-2 p-6 lg:col-span-3">
              <p className="font-semibold">Tinted panel (surface 2)</p>
              <p className="text-muted">
                Used for alternating sections, like Skills or Testimonials.
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
