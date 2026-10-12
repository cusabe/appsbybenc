import { clientProjects, featuredProjects } from "@/content/projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ClientWork } from "@/components/work/ClientWork";
import { FeaturedCard } from "@/components/work/FeaturedCard";

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

      <Testimonials />

      <About />

      <Contact />
    </>
  );
}
