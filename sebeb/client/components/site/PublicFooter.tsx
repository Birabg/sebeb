import Image from "next/image";
import Link from "next/link";
import Button from "@/formic/components/Button";

type FooterLink = { label: string; href: string };

const navigationLinks: FooterLink[] = [
  { label: "Explore", href: "/#explore" },
  { label: "Crafts", href: "/#crafts" },
  { label: "Courses", href: "/#courses" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

const workshopLinks: FooterLink[] = [
  { label: "All courses", href: "/courses" },
  { label: "Craft categories", href: "/#crafts" },
  { label: "Browse workshops", href: "/#explore" },
];

const accountLinks: FooterLink[] = [
  { label: "Log in", href: "/login" },
  { label: "Create account", href: "/register" },
  { label: "My learning", href: "/dashboard" },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <nav aria-label={heading}>
      <p className="text-lead font-semibold text-ink">{heading}</p>

      <ul className="mt-5 flex flex-col gap-5">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-body text-ink-2 transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function PublicFooter() {
  return (
    <footer className="footer-surface text-ink">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 md:px-14 lg:px-20 lg:py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="SEBEB — home"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/sebelogo.jpg"
                alt="SEBEB"
                width={72}
                height={72}
                className="h-16 w-16 object-contain"
              />

              <span className="text-heading font-semibold tracking-tight text-ink">
                SEBEB
              </span>
            </Link>

            <p className="mt-5 text-caption leading-6 text-ink-3">
              A digital craft workshop teaching practical skills through
              structured, hands-on learning.
            </p>
          </div>

          <Button
            href="/courses"
            variant="accent"
            iconEnd="arrow-right"
            className="footer-cta self-start sm:self-auto"
          >
            Start Learning
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:mt-16 lg:max-w-2xl lg:ml-auto">
          <FooterColumn heading="Navigation" links={navigationLinks} />
          <FooterColumn heading="Workshops" links={workshopLinks} />
          <FooterColumn heading="Account" links={accountLinks} />
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <div className="flex flex-col gap-2 text-small text-ink-3 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
            <p>Learn the craft. Make something real.</p>

            <p>© {new Date().getFullYear()} SEBEB. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Photograph: Pexels 4173272, "Artisan choosing leather piece in
          workshop" by Gustavo Fring (Pexels License), shared with the hero. */}
      <div className="relative isolate w-full overflow-hidden">
        <Image
          src="/images/leathercraft-workshop.jpg"
          alt="A leathercraft artisan selecting a piece of leather at a workshop bench"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <div aria-hidden className="footer-workshop-scrim absolute inset-0" />

        <div className="footer-workshop-stage relative flex items-end justify-center">
          <span className="footer-wordmark select-none text-center font-semibold text-ink">
            SEBEB
          </span>
        </div>
      </div>
    </footer>
  );
}
