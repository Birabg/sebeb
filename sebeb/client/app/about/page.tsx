import type { Metadata } from "next";
import AppShell from "@/formic/components/AppShell";
import Button from "@/formic/components/Button";
import { Card } from "@/formic/components/primitives";
import {
  CardDescription,
  CardGroup,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@/formic/components/cards";
import PublicActions, { PublicTitle } from "@/components/site/PublicNav";
import PublicFooter from "@/components/site/PublicFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "SEBEB is a public learning platform built around practical knowledge, creativity, craftsmanship, and meaningful growth.",
};

/* Brief
   Reader:   a visitor checking what SEBEB stands for before joining
   Question: can I trust this platform, and what does it actually offer?
   Action:   browse the courses, or sign in if already a member
   Register: text (prose, a values grid, one list; no figures, no charts)
*/

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

export default function AboutPage() {
  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="About"
      actions={<PublicActions />}
    >
      <div className="w-full">
        {/* Hero */}
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              About SEBEB
            </p>

            <h2 className="mt-4 max-w-3xl text-display-lg font-semibold tracking-tight text-ink sm:text-display-xl">
              Cause of Beauty
              <br />
              and Simplicity.
            </h2>

            <p className="mt-6 max-w-2xl text-lead text-ink-2">
              SEBEB is a learning platform built around practical knowledge,
              creativity, craftsmanship, and meaningful growth. Come explore
              freely — understand what we offer first, and create an account
              only when you are ready to learn.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/courses" variant="secondary" size="lg">
                Browse courses
              </Button>

              <Button href="/login" variant="outline" size="lg" icon="login">
                Log in
              </Button>
            </div>
          </div>
        </section>

        {/* Belief */}
        <section className="border-b border-line">
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
        <section className="border-b border-line bg-inset">
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
        <section className="border-b border-line">
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

        {/* Closing CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-6 py-14 text-center sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              Come explore
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-display-lg font-semibold tracking-tight text-ink sm:text-display-xl">
              See what SEBEB offers before you create an account.
            </h2>

            <div className="mt-8 flex justify-center">
              <Button href="/courses" variant="accent" size="lg">
                Explore courses
              </Button>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </AppShell>
  );
}
