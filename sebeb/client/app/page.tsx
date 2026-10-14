"use client";

import Image from "next/image";
import type { MouseEvent as ReactMouseEvent } from "react";
import AppShell from "@/formic/components/AppShell";
import Button from "@/formic/components/Button";
import { useReducedMotion } from "@/formic/components/hooks";
import { Card } from "@/formic/components/primitives";
import {
  CardDescription,
  CardGroup,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@/formic/components/cards";
import { Icon } from "@/formic/components/primitives";
import CourseCard from "@/components/courses/CourseCard";
import PublicActions, { PublicTitle } from "@/components/site/PublicNav";
import PublicFooter from "@/components/site/PublicFooter";
import { courses } from "@/lib/data/courses";
import { siteImages } from "@/lib/data/images";
import { useLang } from "@/lib/i18n/use-lang";

/* Brief
   Reader:   a first-time visitor arriving on the homepage, on any device
   Question: what is SEBEB and how can I start learning something useful?
   Action:   scroll the page or go to the courses catalog, then enroll
   Register: visual (cards, tiles, and a short path; no figures, no charts)

   Single-page navigation: the header links to the section ids below
   (#home, #explore, #crafts, #courses, #how-it-works, #about). Each section
   carries scroll-mt-16 so the sticky h-12 header never covers its first line. */

function ImagePlaceholder({
  src,
  label = "Image",
  className = "",
}: {
  src?: string;
  label?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-inset ${className}`}
      >
        <div className="absolute inset-4 rounded-card border border-line" />

        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <Icon name="sparkles" size={20} strokeWidth={1.8} className="text-ink-3" />

          <span className="text-small uppercase tracking-wide text-ink-3">
            {label}
          </span>
        </div>

        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-line" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-line" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export default function LandingPage() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();

  /* Scroll to the Crafts section without a route change; honors reduced motion. */
  const goToCrafts = (
    event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const crafts = document.getElementById("crafts");
    if (!crafts) return;
    event.preventDefault();
    crafts.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "/#crafts");
  };

const featuredCourses = courses.slice(0, 3);

  const craftTiles = [
    {
      title: t("crafts.leather"),
      subtitle: t("crafts.leatherDesc"),
      image: siteImages.crafts.leather,
      number: "01",
    },
    {
      title: t("crafts.wood"),
      subtitle: t("crafts.woodDesc"),
      image: siteImages.crafts.wood,
      number: "02",
    },
    {
      title: t("crafts.pottery"),
      subtitle: t("crafts.potteryDesc"),
      image: siteImages.crafts.pottery,
      number: "03",
    },
    {
      title: t("crafts.weaving"),
      subtitle: t("crafts.weavingDesc"),
      image: siteImages.crafts.weaving,
      number: "04",
    },
  ];

  const steps = [
    {
      number: "01",
      title: t("howItWorks.steps.discover"),
      copy: t("howItWorks.steps.discoverCopy"),
    },
    {
      number: "02",
      title: t("howItWorks.steps.explore"),
      copy: t("howItWorks.steps.exploreCopy"),
    },
    {
      number: "03",
      title: t("howItWorks.steps.understand"),
      copy: t("howItWorks.steps.understandCopy"),
    },
    {
      number: "04",
      title: t("howItWorks.steps.enroll"),
      copy: t("howItWorks.steps.enrollCopy"),
    },
    {
      number: "05",
      title: t("howItWorks.steps.practice"),
      copy: t("howItWorks.steps.practiceCopy"),
    },
    {
      number: "06",
      title: t("howItWorks.steps.make"),
      copy: t("howItWorks.steps.makeCopy"),
    },
  ];

  const values = [
    {
      title: "Open by default",
      copy: "Anyone can browse courses, read curricula and understand our offerings before creating an account.",
    },
    {
      title: "Craft over shortcuts",
      copy: "We teach process, materials and attention to detail — the parts of learning that last.",
    },
    {
      title: "Learn by making",
      copy: "Every course is built around practice and projects, not passive watching.",
    },
    {
      title: "Progress you can see",
      copy: "Your dashboard keeps lessons, progress and certificates in one calm workspace.",
    },
  ];

  const offerings = [
    {
      title: "Public discovery",
      copy: "Landing page, course catalog, craft categories and full course details are open to every visitor.",
    },
    {
      title: "Structured courses",
      copy: "Descriptions, learning outcomes, curriculum, duration, skill level and pricing are shown up front.",
    },
    {
      title: "A clear path to enroll",
      copy: "When you decide to learn, you create an account, complete enrollment and continue to your lessons.",
    },
    {
      title: "A workshop of your own",
      copy: "Signed-in learners get a dashboard, learning player, progress tracking and certificates.",
    },
  ];

  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="Home"
      actions={<PublicActions />}
    >
      <div className="w-full">
        {/* Home — Editorial two-column hero */}
        <section id="home" className="hero-band scroll-mt-16">
          <div className="hero-surface hero-frame relative w-full">
            <div className="hero-stage">
              {/* Left column: copy */}
              <div className="hero-copy">
                <p className="hero-eyebrow">{t("home.eyebrow")}</p>

                <h1 className="hero-display">
                  {t("home.headline")}
                  <br />
                  Make
                  <br />
                  Something
                  <br />
                  Real.
                </h1>

                <p className="hero-lede">{t("home.description")}</p>

                <div className="hero-cta-row">
<Button
                    href="/courses"
                    variant="accent"
                    size="lg"
                    iconEnd="arrow-right"
                    className="hero-cta-primary"
                  >
                    {t("home.ctaStartLearning")}
                  </Button>

                  <Button
                    href="/#crafts"
                    variant="outline"
                    size="lg"
                    className="hero-cta-secondary"
                    onClick={goToCrafts}
                  >
                    {t("home.ctaExploreProjects")}
                  </Button>
                </div>

                <div className="hero-trust" aria-label="Trust indicators">
                  <span>{t("home.trustSelfPaced")}</span>
                  <span>{t("home.trustLifetimeAccess")}</span>
                  <span>{t("home.trustMadeByHand")}</span>
                </div>
              </div>

{/* Right column: image */}
              <div className="hero-image-wrapper" aria-hidden="true">
                <Image
                  src={siteImages.hero.main}
                  alt={t("home.heroAlt")}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 680px"
                  className="hero-image"
                />
                <div className="hero-image-caption">
                  {t("home.imageCaption")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore — featured workshops */}
        <section id="explore" className="scroll-mt-16 border-b border-line bg-inset">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                  {t("home.workshopCatalog")}
                </p>

                <h2 className="mt-4 text-display-lg font-semibold tracking-tight text-ink">
                  {t("home.workshopCatalogTitle")}
                  <span className="block text-accent">
                    {t("home.workshopCatalogSubtitle")}
                  </span>
                </h2>
              </div>

              <Button href="/#courses" variant="link" size="sm" icon="arrow-right">
                {t("home.viewAllWorkshops")}
              </Button>
            </div>

            <CardGroup columns={3} className="mt-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </CardGroup>
          </div>
        </section>

        {/* Craft Worlds */}
        <section id="crafts" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                  {t("home.craftWorlds")}
                </p>

                <h2 className="mt-4 max-w-2xl text-display-lg font-semibold tracking-tight text-ink">
                  {t("home.craftWorldsTitle")}
                  <span className="block text-accent">
                    {t("home.craftWorldsSubtitle")}
                  </span>
                </h2>
              </div>

              <Button href="/#courses" variant="link" size="sm" icon="arrow-right">
                {t("home.viewAllWorkshops")}
              </Button>
            </div>

            <CardGroup columns={4} className="mt-8">
              {craftTiles.map((tile) => (
                <Card key={tile.title} className="card-hover">
                  <CardMedia src={tile.image} alt={`${tile.title} image`} />
                  <CardHeader>
                    <span className="text-small font-medium tabular-nums text-ink-3">
                      {tile.number}
                    </span>

                    <CardTitle>{tile.title}</CardTitle>

                    <CardDescription>{tile.subtitle}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </CardGroup>
          </div>
        </section>

        {/* Courses — the full catalog */}
        <section id="courses" className="scroll-mt-16 border-b border-line bg-inset">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                  {t("home.allWorkshops")}
                </p>

                <h2 className="mt-4 text-display-lg font-semibold tracking-tight text-ink">
                  {t("home.allWorkshopsTitle")}
                  <span className="block text-accent">
                    {t("home.allWorkshopsSubtitle")}
                  </span>
                </h2>
              </div>

              <Button href="/courses" variant="link" size="sm" icon="arrow-right">
                {t("nav.courses")}
              </Button>
            </div>

            <CardGroup columns={3} className="mt-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </CardGroup>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              How SEBEB works
            </p>

            <h2 className="mt-4 text-display-lg font-semibold tracking-tight text-ink">
              Learn. Practice.
              <span className="block text-accent">Make.</span>
            </h2>

            <p className="mt-4 max-w-xl text-body text-ink-2">
              A simple journey from discovering a skill to actually creating
              something with it.
            </p>

            <CardGroup columns={3} className="mt-8">
              {steps.map((step) => (
                <Card key={step.number} className="card-hover">
                  <CardHeader>
                    <span className="text-small font-medium tabular-nums text-ink-3">
                      {step.number}
                    </span>

                    <CardTitle>{step.title}</CardTitle>

                    <CardDescription>{step.copy}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </CardGroup>
          </div>
</section>

        {/* What we believe */}
        <section id="belief" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:items-center">
            <Card>
              <CardMedia
                src="/About.png"
                alt="About SEBEB"
              />
            </Card>

            <div>
              <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                What we believe
              </p>

              <p className="mt-4 text-display-lg font-semibold tracking-tight text-ink">
                Understanding should come before commitment. Nobody should have
                to sign up to find out what a platform is.
              </p>

              <p className="mt-6 max-w-xl text-body text-ink-2">
                That is why SEBEB is public-first. Visitors can discover
                courses, compare crafts, read curricula and see pricing in the
                open. Authentication happens at the moment it matters — when
                you decide to enroll.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="scroll-mt-16 border-b border-line bg-inset">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              Our values
            </p>

            <CardGroup columns={2} className="mt-8">
              {values.map((value, index) => (
                <Card key={value.title} className="card-hover">
                  <CardHeader>
                    <span className="text-small font-medium tabular-nums text-ink-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <CardTitle>{value.title}</CardTitle>

                    <CardDescription>{value.copy}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </CardGroup>
          </div>
        </section>

        {/* Offerings */}
        <section id="offerings" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              What SEBEB offers
            </p>

            <div className="border-t border-line">
              {offerings.map((item) => (
                <div key={item.title} className="border-b border-line py-6">
                  <p className="text-lead font-medium text-ink">{item.title}</p>

                  <p className="mt-2 max-w-2xl text-caption text-ink-2">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-16 border-b border-line bg-inset">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:items-center">
            <Card>
              <CardMedia
                src="/About.png"
                alt="About SEBEB"
              />
            </Card>

            <div>
              <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                {t("home.aboutTitle")}
              </p>

              <h2 className="mt-4 text-display-lg font-semibold tracking-tight text-ink">
                {t("about.builtForMakers")}
              </h2>

              <p className="mt-6 max-w-xl text-body text-ink-2">
                {t("home.aboutDesc")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#values" variant="outline" size="lg" icon="arrow-right">
                  {t("home.moreAbout")}
                </Button>

                <Button href="#courses" variant="accent" size="lg" icon="arrow-right">
                  {t("home.browseWorkshops")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-6 py-14 text-center sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              {t("home.readyToBegin")}
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-display-lg font-semibold tracking-tight text-ink">
              Make something real
              <span className="block text-accent">with your own hands.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-body text-ink-2">
              {t("home.exploreFreely")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/#courses" variant="accent" size="lg" icon="arrow-right">
                {t("home.exploreWorkshops")}
              </Button>

              <Button href="/login" variant="outline" size="lg" icon="login">
                {t("nav.login")}
              </Button>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </AppShell>
  );
}
