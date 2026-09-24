import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";

// Placeholder sections so the header links have somewhere to go.
// Each one is replaced in its own phase.
const upcoming = [
  { id: "work", eyebrow: "Work", title: "Recent work", phase: 4 },
  {
    id: "about",
    eyebrow: "About",
    title: "About Ben C",
    phase: 6,
    tinted: true,
  },
  {
    id: "testimonials",
    eyebrow: "Testimonials",
    title: "Kind words",
    phase: 6,
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Get in touch",
    phase: 7,
    tinted: true,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      {upcoming.map((s) => (
        <Section key={s.id} id={s.id} tinted={s.tinted}>
          <SectionHeading
            eyebrow={s.eyebrow}
            title={s.title}
            intro={`Coming in Phase ${s.phase}.`}
          />
        </Section>
      ))}
    </>
  );
}
