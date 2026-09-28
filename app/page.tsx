import { clientProjects, featuredProjects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ClientWork } from "@/components/work/ClientWork";
import { FeaturedCard } from "@/components/work/FeaturedCard";

// Placeholder sections so the header links have somewhere to go.
// Each one is replaced in its own phase.
const upcoming = [
  {
    id: "about",
    eyebrow: "About",
    title: "About Ben C",
    phase: 6,
  },
  {
    id: "testimonials",
    eyebrow: "Testimonials",
    title: "Kind words",
    phase: 6,
    tinted: true,
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Get in touch",
    phase: 7,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="work">
        <SectionHeading
          eyebrow="Recent work"
          title="Production builds"
          intro="Recent launches in medtech, fintech and a digital startup."
        />
        <div className="space-y-8">
          {featuredProjects.map((project, i) => (
            <FeaturedCard
              key={project.slug}
              project={project}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <Section id="more-work" tinted>
        <SectionHeading
          eyebrow="More client work"
          title="Platforms, apps and small-business websites"
          intro="Contract work, freelance clients and websites for local businesses."
        />
        <ClientWork projects={clientProjects} />
      </Section>

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
