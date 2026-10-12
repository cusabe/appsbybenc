import Image from "next/image";
import { about } from "@/content/about";
import { Section, SectionHeading } from "@/components/ui/Section";

export function About() {
  const { portrait, columns } = about.photos;

  return (
    <Section id="about" tinted>
      <SectionHeading eyebrow="About" title={about.heading} />

      <div className="relative isolate md:overflow-hidden md:rounded-3xl md:border md:border-border md:p-10 lg:p-12">
        {/* Desktop only: the concrete columns as a faded backdrop. The photo is
            low resolution, so it's softened and washed back rather than shown
            sharp; a stronger wash behind the text keeps it easy to read. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden md:block"
        >
          <Image
            src={columns}
            alt=""
            fill
            sizes="1088px"
            className="scale-105 object-cover opacity-50 blur-[2px] dark:opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-2/10 via-surface-2/75 to-surface-2/95" />
        </div>

        <div className="grid items-start gap-10 md:grid-cols-5 md:gap-12">
          <div className="relative mx-auto aspect-2/3 w-full max-w-xs overflow-hidden rounded-3xl border border-border shadow-lifted md:col-span-2 md:max-w-none">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(min-width: 768px) 40vw, 320px"
              className="object-cover"
            />
          </div>

          <div className="space-y-6 md:col-span-3">
            <div className="space-y-4 text-lg">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h3 className="mb-2 text-xl font-bold tracking-tight">
                {about.ai.heading}
              </h3>
              <p>{about.ai.text}</p>
            </div>

            <p className="font-semibold">{about.availability}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
