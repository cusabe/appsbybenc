import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const social = site.social.filter((link) => link.href);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* The sunset photo rises out of the page and fades into the footer. */}
      <div className="relative h-40 sm:h-56">
        <Image
          src="/images/ngunnawal-skies.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_70%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-bg via-transparent to-bg" />
      </div>

      <Container className="space-y-8 pt-4 pb-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          {/* Placeholder wordmark until the redesigned logo arrives (see design/LOGO_BRIEF.md). */}
          <div className="w-28 shrink-0 sm:w-32">
            <Image
              src="/images/logo-abc-light.png"
              alt={`${site.brand} logo`}
              width={591}
              height={591}
              className="dark:hidden"
            />
            <Image
              src="/images/logo-abc-dark.png"
              alt={`${site.brand} logo`}
              width={591}
              height={591}
              className="hidden dark:block"
            />
          </div>
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">
              Acknowledgement of Country
            </p>
            <p className="text-lg">{site.footer.acknowledgement}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/style-tile"
                className="font-semibold text-accent hover:underline"
              >
                Design system
              </Link>
            </li>
          </ul>
          <p>{site.footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
