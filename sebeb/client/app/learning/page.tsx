"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  Menu,
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LearningCourseCard from "@/components/dashboard/LearningCourseCard";

type Tab = "in-progress" | "completed" | "saved";

const courses = [
  {
    id: 1,
    title: "Foundations of Fine Craftsmanship",
    category: "Craft & Making",
    description:
      "Explore materials, tools, technique, and the principles behind thoughtful craftsmanship.",
    progress: 64,
    lessonsCompleted: 12,
    totalLessons: 18,
    duration: "5h 40m",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/foundations-of-fine-craftsmanship",
    completed: false,
    status: "in-progress",
  },
  {
    id: 2,
    title: "Creative Making with Intention",
    category: "Creative Skills",
    description:
      "Develop a stronger creative process by learning how ideas become meaningful, practical work.",
    progress: 82,
    lessonsCompleted: 14,
    totalLessons: 17,
    duration: "4h 15m",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/creative-making-with-intention",
    completed: false,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Objects, Materials & Form",
    category: "Craft & Making",
    description:
      "Understand the relationship between material, form, function, and the objects we create.",
    progress: 41,
    lessonsCompleted: 7,
    totalLessons: 16,
    duration: "4h 50m",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/objects-materials-and-form",
    completed: false,
    status: "in-progress",
  },
  {
    id: 4,
    title: "Digital Skills Foundation",
    category: "Digital Skills",
    description:
      "Build practical digital skills and confidence for modern creative and professional work.",
    progress: 26,
    lessonsCompleted: 4,
    totalLessons: 15,
    duration: "3h 35m",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/digital-skills-foundation",
    completed: false,
    status: "in-progress",
  },
  {
    id: 5,
    title: "Professional Growth",
    category: "Professional Skills",
    description:
      "Develop the habits, communication skills, and practical thinking needed for professional growth.",
    progress: 100,
    lessonsCompleted: 12,
    totalLessons: 12,
    duration: "3h 10m",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/professional-growth",
    completed: true,
    status: "completed",
  },
  {
    id: 6,
    title: "Business Foundations",
    category: "Business",
    description:
      "Learn the fundamentals of turning skills and ideas into sustainable professional opportunities.",
    progress: 100,
    lessonsCompleted: 10,
    totalLessons: 10,
    duration: "2h 45m",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
    href: "/courses/business-foundations",
    completed: true,
    status: "completed",
  },
];

const tabs: { id: Tab; label: string }[] = [
  {
    id: "in-progress",
    label: "In progress",
  },
  {
    id: "completed",
    label: "Completed",
  },
  {
    id: "saved",
    label: "Saved",
  },
];

export default function MyLearningPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("in-progress");

  const filteredCourses =
    activeTab === "saved"
      ? []
      : courses.filter((course) => course.status === activeTab);

  const inProgressCount = courses.filter(
    (course) => course.status === "in-progress",
  ).length;

  const completedCount = courses.filter(
    (course) => course.status === "completed",
  ).length;

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

          <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {/* Page heading */}
            <section className="border-b border-line pb-9">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-olive">
                    Your learning
                  </p>

                  <h1 className="editorial mt-3 text-4xl leading-tight text-ink sm:text-5xl">
                    My Learning
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                    Everything you are learning, completed, and working
                    towards in one place.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-olive transition hover:text-olive-dark"
                >
                  Explore more courses
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </section>

            {/* Overview */}
            <section className="grid border-x border-b border-line bg-line sm:grid-cols-3">
              <div className="bg-paper px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-paper-deep text-olive">
                    <BookOpen size={17} strokeWidth={1.5} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      In progress
                    </p>

                    <p className="mt-1 text-xl font-medium text-ink">
                      {inProgressCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-paper px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-paper-deep text-olive">
                    <CheckCircle2 size={17} strokeWidth={1.5} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Completed
                    </p>

                    <p className="mt-1 text-xl font-medium text-ink">
                      {completedCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-paper px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-paper-deep text-olive">
                    <Clock3 size={17} strokeWidth={1.5} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Learning time
                    </p>

                    <p className="mt-1 text-xl font-medium text-ink">
                      18.5h
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tabs */}
            <section className="mt-10">
              <div className="flex items-center gap-6 overflow-x-auto border-b border-line">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative whitespace-nowrap pb-4 text-sm transition
                        ${
                          active
                            ? "font-medium text-olive"
                            : "text-muted hover:text-ink"
                        }
                      `}
                    >
                      {tab.label}

                      {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-olive" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Featured course */}
            {activeTab === "in-progress" && (
              <section className="mt-8">
                <div className="grid overflow-hidden border border-line bg-paper-light lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[280px] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85"
                      alt="Foundations of Fine Craftsmanship"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute bottom-5 left-5">
                      <span className="bg-paper px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-olive">
                        Continue learning
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Pick up where you left off
                    </p>

                    <h2 className="editorial mt-3 max-w-xl text-3xl leading-tight text-ink sm:text-4xl">
                      Foundations of Fine Craftsmanship
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                      You are 64% through this course. Continue with your next
                      lesson and keep building your understanding of thoughtful
                      making.
                    </p>

                    <div className="mt-7 max-w-xl">
                      <div className="mb-2 flex justify-between text-[11px]">
                        <span className="text-muted">
                          12 of 18 lessons
                        </span>

                        <span className="font-semibold text-olive">
                          64%
                        </span>
                      </div>

                      <div className="h-1.5 bg-line">
                        <div className="h-full w-[64%] bg-olive" />
                      </div>
                    </div>

                    <Link
                      href="/courses/foundations-of-fine-craftsmanship"
                      className="mt-7 inline-flex w-fit items-center gap-2 bg-olive px-5 py-3 text-xs font-medium text-white transition hover:bg-olive-dark"
                    >
                      Continue course
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Course list */}
            <section className="mt-12">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {activeTab === "in-progress"
                      ? "Currently learning"
                      : activeTab === "completed"
                        ? "Finished courses"
                        : "Saved for later"}
                  </p>

                  <h2 className="editorial mt-2 text-2xl text-ink">
                    {activeTab === "in-progress"
                      ? "Keep going"
                      : activeTab === "completed"
                        ? "Your achievements"
                        : "Courses you saved"}
                  </h2>
                </div>
              </div>

              {filteredCourses.length > 0 ? (
                <div className="space-y-5">
                  {filteredCourses.map((course) => (
                    <LearningCourseCard
                      key={course.id}
                      title={course.title}
                      category={course.category}
                      description={course.description}
                      progress={course.progress}
                      lessonsCompleted={course.lessonsCompleted}
                      totalLessons={course.totalLessons}
                      duration={course.duration}
                      image={course.image}
                      href={course.href}
                      completed={course.completed}
                    />
                  ))}
                </div>
              ) : (
                <div className="border border-line bg-paper-light px-6 py-14 text-center sm:px-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-paper-deep text-olive">
                    <Compass size={21} strokeWidth={1.4} />
                  </div>

                  <h3 className="editorial mt-5 text-2xl text-ink">
                    Nothing saved yet
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                    Explore the SEBEB course library and save courses you want
                    to come back to later.
                  </p>

                  <Link
                    href="/courses"
                    className="mt-6 inline-flex items-center gap-2 bg-olive px-5 py-3 text-xs font-medium text-white transition hover:bg-olive-dark"
                  >
                    Browse courses
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}