import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-hero">
      <Container className="flex min-h-[60svh] flex-col items-start justify-center gap-5 py-20">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">
          404
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          That page has drifted off into the sunset.
        </h1>
        <p className="max-w-xl text-lg">
          It may have moved, or the link might be out of date.
        </p>
        <ButtonLink href="/" className="px-6 py-3 text-base">
          Back to the home page
        </ButtonLink>
      </Container>
    </section>
  );
}
