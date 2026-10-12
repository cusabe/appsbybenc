import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Contact() {
  const profiles = site.social.filter((link) => link.href);

  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="Contact"
            title={contact.heading}
            intro={contact.intro}
          />
          {profiles.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-widest text-muted uppercase">
                Also find me on
              </p>
              <ul className="flex flex-wrap gap-3">
                {profiles.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 font-semibold text-text shadow-soft transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
