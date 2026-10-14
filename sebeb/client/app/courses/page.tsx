import type { Metadata } from "next";
import AppShell from "@/formic/components/AppShell";
import { CardGroup } from "@/formic/components/cards";
import Button from "@/formic/components/Button";
import CourseCard from "@/components/courses/CourseCard";
import PublicActions, { PublicTitle } from "@/components/site/PublicNav";
import PublicFooter from "@/components/site/PublicFooter";
import { courses } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore practical courses and learning experiences from SEBEB.",
};

/* Brief
   Reader:   a visitor deciding what to learn, on any device
   Question: what can I learn here, and which course is for me?
   Action:   open a course
   Register: visual (a grid of course cards; no figures, no charts) */

export default function CoursesPage() {
  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="Courses"
      actions={<PublicActions />}
    >
      <div className="w-full">
        {/* Intro */}
        <section className="border-b border-line pb-12">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              Explore SEBEB
            </p>

            <h2 className="mt-4 max-w-3xl text-display-lg font-semibold tracking-tight text-ink">
              Learn something
              <span className="block text-accent">worth making.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-body text-ink-2">
              Explore practical courses designed to help you understand, create,
              and develop skills that become useful beyond the classroom.
            </p>
          </div>
        </section>

        {/* Catalog */}
        <section id="crafts">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-heading font-semibold tracking-tight text-ink">
                  All courses
                </h2>

                <p className="text-small tabular-nums text-ink-3">
                  {courses.length} courses
                </p>
              </div>

              <Button href="/courses" variant="link" size="sm" icon="arrow-right">
                View all workshops
              </Button>
            </div>

            <CardGroup columns={3} className="mt-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </CardGroup>
          </div>
        </section>

        <PublicFooter />
      </div>
    </AppShell>
  );
}