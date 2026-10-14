import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnrollActions from "@/components/courses/EnrollActions";
import { courses, formatPrice } from "@/lib/data/courses";

type EnrollPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: EnrollPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return {
      title: "Course not found",
    };
  }

  return {
    title: `Enroll — ${course.title}`,
    description: `Review your enrollment for ${course.title} and complete your registration with SEBEB.`,
  };
}

export default async function EnrollPage({ params }: EnrollPageProps) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line">
        <div className="container flex h-[82px] items-center justify-between">
          <Link href="/">
            <img
              src="/sebelogo.jpg"
              alt="SEBEB logo"
              className="h-7 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className="hidden px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft sm:block"
            >
              Back to course
            </Link>

            <Link
              href="/dashboard/learning"
              className="bg-olive px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-olive-dark"
            >
              My Learning
            </Link>
          </div>
        </div>
      </header>

      <section className="container grid gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Link
            href={`/courses/${course.slug}`}
            className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted hover:text-olive"
          >
            Back to course details
          </Link>

          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-olive">
            Enrollment · {course.category}
          </p>

          <h1 className="editorial mt-5 text-[44px] leading-[0.95] tracking-[-0.045em] sm:text-[58px]">
            Complete your enrollment.
          </h1>

          <p className="mt-6 max-w-[560px] text-[14px] leading-8 text-ink-soft">
            Review your course below, confirm your enrollment, and continue to
            your learning space. Your course stays available from My
            Learning.
          </p>

          <div className="mt-10 border border-line bg-paper-light p-3">
            <div className="aspect-[1.6/1] overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-olive">
                  {course.category}
                </p>

                <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
                  {course.level}
                </span>
              </div>

              <h2 className="editorial mt-4 text-[26px] leading-[1.05] tracking-[-0.025em]">
                {course.title}
              </h2>

              <p className="mt-4 text-[13px] leading-7 text-muted">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-muted">
                    Instructor
                  </p>
                  <p className="mt-1 text-[12px]">{course.instructor}</p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-muted">
                    Lessons
                  </p>
                  <p className="mt-1 text-[12px]">{course.lessons}</p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-muted">
                    Duration
                  </p>
                  <p className="mt-1 text-[12px]">{course.duration}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="border border-line bg-paper-light p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                Enrollment summary
              </p>

              <div className="mt-7 space-y-4 border-b border-line pb-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[13px] text-ink">{course.title}</p>

                    <p className="mt-1 text-[11px] text-muted">
                      {course.category} · {course.level}
                    </p>
                  </div>

                  <p className="shrink-0 text-[13px] text-ink">
                    {formatPrice(course.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    Access
                  </p>

                  <p className="text-[13px] text-ink">Full course</p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-6 py-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    Total
                  </p>

                  <p className="mt-1 text-[10px] text-muted">One-time course fee</p>
                </div>

                <p className="editorial text-[34px] leading-none">
                  {formatPrice(course.price)}
                </p>
              </div>

              <EnrollActions slug={course.slug} />
            </div>

            <div className="mt-6 border border-line bg-paper-deep p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                What you will learn
              </p>

              <ul className="mt-5 space-y-3">
                {course.learningPoints.slice(0, 3).map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[12px] leading-6 text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 bg-olive" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}