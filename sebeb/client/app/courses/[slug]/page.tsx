import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/formic/components/AppShell";
import Button from "@/formic/components/Button";
import { MetricRow } from "@/formic/components/StatCard";
import { Card } from "@/formic/components/primitives";
import {
  CardGroup,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@/formic/components/cards";
import EnrollButton from "@/components/courses/EnrollButton";
import PublicActions, { PublicTitle } from "@/components/site/PublicNav";
import PublicFooter from "@/components/site/PublicFooter";
import { courses, formatPrice } from "@/lib/data/courses";

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* Brief
   Reader:   a visitor weighing one course before paying for it
   Question: what will I learn, how big is it, and is it worth enrolling?
   Action:   start the enrollment (the card's one accent action)
   Register: balanced (facts as MetricRows, the price card, curriculum list; no figures, no charts)
*/

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return {
      title: "Course not found",
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({
  params,
}: CoursePageProps) {
  const { slug } = await params;

  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="Course"
      actions={<PublicActions />}
    >
      <div className="w-full">
        {/* Hero */}
        <section className="border-b border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:px-8 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Button variant="link" size="xs" href="/courses" icon="arrow-left">
                Back to crafts
              </Button>

              <p className="mt-8 text-small font-medium uppercase tracking-wide text-ink-3">
                {course.category}
              </p>

              <h2 className="mt-4 text-display-lg font-semibold tracking-tight text-ink sm:text-display-xl">
                {course.title}
              </h2>

              <p className="mt-5 max-w-xl text-lead text-ink-2">
                {course.description}
              </p>

              <div className="mt-8 max-w-md">
                <MetricRow label="Level" value={course.level} />
                <MetricRow label="Lessons" value={course.lessons} />
                <MetricRow label="Duration" value={course.duration} />
                <MetricRow label="Instructor" value={course.instructor} />
                <MetricRow label="Price" value={formatPrice(course.price)} />
              </div>
            </div>

            <Card>
              <CardMedia src={course.image} alt={course.title} />

              <div className="p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-small text-ink-3">Course fee</p>

                    <p className="mt-1 text-display font-semibold tabular-nums text-ink">
                      {formatPrice(course.price)}
                    </p>
                  </div>

                  <p className="text-right text-small tabular-nums text-ink-3">
                    {course.lessons} lessons · {course.duration}
                  </p>
                </div>

                <div className="mt-5">
                  <EnrollButton slug={course.slug} />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* About */}
        <section className="border-b border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              About this course
            </p>

            <div>
              <p className="max-w-2xl text-display-lg font-semibold tracking-tight text-ink">
                A practical learning experience built around understanding,
                practice, and progress.
              </p>

              <p className="mt-6 max-w-2xl text-body text-ink-2">
                {course.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="border-b border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-small font-medium uppercase tracking-wide text-ink-3">
                Course curriculum
              </p>

              <p className="mt-4 max-w-xs text-caption text-ink-2">
                {course.lessons} lessons · {course.duration} of guided
                learning. Preview the structure before you enroll.
              </p>
            </div>

            <div className="border-t border-line">
              {course.curriculum.map((module, index) => (
                <div
                  key={module.title}
                  className="flex items-center justify-between gap-6 border-b border-line py-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="text-small font-medium tabular-nums text-ink-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="truncate text-lead font-medium text-ink">
                      {module.title}
                    </p>
                  </div>

                  <span className="shrink-0 text-small tabular-nums text-ink-3">
                    {module.lessons} lessons
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you will learn */}
        <section className="border-b border-line bg-inset">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              What you will learn
            </p>

            <CardGroup columns={2} className="mt-8">
              {course.learningPoints.map((point, index) => (
                <Card key={point}>
                  <CardHeader>
                    <span className="text-small font-medium tabular-nums text-ink-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <CardTitle>{point}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </CardGroup>
          </div>
        </section>

        <PublicFooter />
      </div>
    </AppShell>
  );
}
