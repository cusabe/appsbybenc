import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { eyebrow, headline, subline, primaryCta, secondaryCta } = site.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* The sunset, zoomed in on the coral streaks. The footer shows the wide panorama. */}
      <Image
        src="/images/ngunnawal-skies.jpg"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 scale-110 object-cover object-[center_45%]"
      />
      {/* Keep the text readable: an even wash on phones, the text-column fade
          on wider screens (see hero-wash in globals.css), and a fade into the
          next section along the bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-bg/75 sm:bg-transparent sm:hero-wash"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-b from-transparent to-bg"
      />

      <Container className="flex min-h-[calc(70svh-4rem)] flex-col justify-center py-16 sm:py-20">
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-text backdrop-blur">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl">{subline}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={primaryCta.href} className="px-6 py-3 text-base">
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={secondaryCta.href}
            variant="secondary"
            className="px-6 py-3 text-base"
          >
            {secondaryCta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
