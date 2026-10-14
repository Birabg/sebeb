"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import CourseProgressCard from "@/components/dashboard/CourseProgressCard";
import CraftJourney from "@/components/dashboard/CraftJourney";
import MyProjects from "@/components/dashboard/MyProjects";

const courses = [
  {
    title: "Leather Craft Fundamentals",
    category: "Leather",
    progress: 64,
    lessons: "12 of 18 lessons",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=85",
    href: "/courses/foundations-of-fine-craftsmanship",
  },
  {
    title: "Creative Making with Intention",
    category: "Creative Skills",
    progress: 82,
    lessons: "14 of 17 lessons",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
    href: "/courses/creative-making-with-intention",
  },
  {
    title: "Objects, Materials & Form",
    category: "Craft & Making",
    progress: 41,
    lessons: "7 of 16 lessons",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85",
    href: "/courses/objects-materials-and-form",
  },
];

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex min-h-screen">
        <DashboardSidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <DashboardHeader
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <section className="mb-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive">
                Your Workshop
              </p>

              <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <h1 className="editorial text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
                    Good morning, Bira.
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                    Continue building your craft. Measure, cut, stitch and make.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-olive transition hover:text-olive-dark"
                >
                  Browse crafts
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </section>

            <section className="mt-10">
              <ContinueLearning />
            </section>

            <section className="mt-12 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
              <div>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Your learning
                    </p>

                    <h2 className="editorial mt-2 text-3xl text-ink">
                      My courses
                    </h2>
                  </div>

                  <Link
                    href="/dashboard/learning"
                    className="hidden items-center gap-2 text-xs font-medium text-olive transition hover:text-olive-dark sm:flex"
                  >
                    View all
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </Link>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {courses.map((course) => (
                    <CourseProgressCard
                      key={course.title}
                      {...course}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <CraftJourney />
                <MyProjects />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
