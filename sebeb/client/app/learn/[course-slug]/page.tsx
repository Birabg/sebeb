"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock3,
  FileText,
  Menu,
  Play,
  X,
} from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  current?: boolean;
};

type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    id: 1,
    title: "Foundations of Craft",
    lessons: [
      {
        id: 1,
        title: "Introduction to Fine Craftsmanship",
        duration: "08:42",
        completed: true,
      },
      {
        id: 2,
        title: "Understanding Materials",
        duration: "14:18",
        completed: true,
      },
      {
        id: 3,
        title: "Tools, Hands & Technique",
        duration: "18:36",
        completed: false,
        current: true,
      },
      {
        id: 4,
        title: "Working With Intention",
        duration: "12:54",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "The Making Process",
    lessons: [
      {
        id: 5,
        title: "Preparing Your Workspace",
        duration: "09:15",
        completed: false,
      },
      {
        id: 6,
        title: "From Idea to Object",
        duration: "16:40",
        completed: false,
      },
      {
        id: 7,
        title: "Refining the Details",
        duration: "13:28",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Developing Your Practice",
    lessons: [
      {
        id: 8,
        title: "Building Consistency",
        duration: "11:32",
        completed: false,
      },
      {
        id: 9,
        title: "Finding Your Visual Language",
        duration: "17:05",
        completed: false,
      },
      {
        id: 10,
        title: "Your Next Steps",
        duration: "10:48",
        completed: false,
      },
    ],
  },
];

export default function LearningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModules, setOpenModules] = useState<number[]>([1, 2]);
  const [currentLesson, setCurrentLesson] = useState(3);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const totalLessons = modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const progress = Math.round(
    (completedLessons.length / totalLessons) * 100,
  );

  const currentLessonData = modules
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === currentLesson);

  const allLessons = modules.flatMap((module) => module.lessons);
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLesson,
  );

  const previousLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  const toggleModule = (moduleId: number) => {
    setOpenModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  const selectLesson = (lessonId: number) => {
    setCurrentLesson(lessonId);
    setSidebarOpen(false);
  };

  const markComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons((current) => [...current, currentLesson]);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Mobile top bar */}
      <header
        className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-paper/95 px-4 backdrop-blur lg:hidden"
      >
        <Link
          href="/dashboard/learning"
          className="flex items-center gap-2 text-xs font-medium text-muted"
        >
          <ChevronLeft size={17} strokeWidth={1.5} />
          My Learning
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center border border-line"
          aria-label="Open course navigation"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </header>

      {/* Desktop header */}
      <header
        className="hidden h-16 items-center justify-between border-b border-line bg-paper px-6 lg:flex"
      >
        <Link
          href="/dashboard/learning"
          className="flex items-center gap-3 text-xs font-medium text-muted transition hover:text-accent"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
          Back to My Learning
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
              Course progress
            </span>

            <div className="h-1 w-28 bg-line">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs font-semibold text-accent">
              {progress}%
            </span>
          </div>

          <div className="h-4 bg-line" />

          <span className="text-xs text-muted">Foundations of Fine Craftsmanship</span>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Course sidebar */}
      <aside
        className={`fixed left-0 top-0 z-[60] flex h-screen w-[310px] flex-col border-r border-line bg-paper transition-transform duration-300 lg:top-16 lg:z-30 lg:w-[300px] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-start justify-between border-b border-line p-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
              Workshop
            </p>

            <h1 className="mt-2 max-w-[230px] text-sm font-medium leading-5 text-ink">
              Leather Craft Fundamentals
            </h1>

            <p className="mt-2 text-[11px] text-muted">
              10 lessons · 2h 24m
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-muted lg:hidden"
            aria-label="Close course navigation"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/* Progress */}
        <div className="border-b border-line px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] text-muted">Your progress</span>

            <span className="text-[10px] font-semibold text-accent">
              {progress}%
            </span>
          </div>

          <div className="h-1 bg-line">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-y-auto">
          {modules.map((module) => {
            const isOpen = openModules.includes(module.id);
            const moduleCompleted = module.lessons.every(
              (lesson) => completedLessons.includes(lesson.id),
            );

            return (
              <div key={module.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-paper-light"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {moduleCompleted ? (
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.5}
                        className="shrink-0 text-accent"
                      />
                    ) : (
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center border border-line text-[9px] text-muted"
                      >
                        {String(module.id).padStart(2, "0")}
                      </span>
                    )}
                    <span className="truncate text-xs font-medium text-ink">
                      {module.title}
                    </span>
                  </div>

                  <ChevronDown
                    size={15}
                    strokeWidth={1.5}
                    className={`shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-2">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLesson;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => selectLesson(lesson.id)}
                          className={`flex w-full items-start gap-3 border-l-2 px-5 py-3.5 pl-8 text-left transition ${
                            isCurrent
                              ? "border-accent bg-paper-light"
                              : "border-transparent hover:bg-paper-light"
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2
                                size={15}
                                strokeWidth={1.5}
                                className="text-accent"
                              />
                            ) : isCurrent ? (
                              <span
                                className="flex h-[15px] w-[15px] items-center justify-center bg-accent"
                              >
                                <Play
                                  size={8}
                                  strokeWidth={2}
                                  fill="currentColor"
                                  className="ml-0.5 text-paper"
                                />
                              </span>
                            ) : (
                              <span className="block h-[15px] w-[15px] border border-line" />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-[11px] leading-4 ${
                                isCurrent
                                  ? "font-semibold text-ink"
                                  : "text-muted"
                              }`}
                            >
                              {lesson.title}
                            </span>

                            <span className="mt-1 flex items-center gap-1 text-[9px] text-muted">
                              <Clock3 size={10} strokeWidth={1.5} />
                              {lesson.duration}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar bottom */}
        <div className="border-t border-line p-5">
          <Link
            href="/dashboard/learning"
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted transition hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Exit workshop
          </Link>
        </div>
      </aside>

      {/* Main learning area */}
      <main className="lg:pl-[300px]">
        <div className="mx-auto max-w-[1250px]">
          {/* Video area */}
          <section className="bg-[#171914]">
            <div className="relative aspect-video min-h-[280px] w-full overflow-hidden lg:min-h-[540px]">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=85"
                alt="Craftsmanship lesson"
                className="absolute inset-0 h-full w-full object-cover opacity-55"
              />

              <div className="absolute inset-0 bg-black/35" />

              {/* Video top label */}
              <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-8 sm:top-8">
                <span className="bg-black/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
                  Lesson {String(currentLesson).padStart(2, "0")}
                </span>
              </div>

              {/* Center play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="group flex h-16 w-16 items-center justify-center rounded-full bg-paper transition-transform hover:scale-105 sm:h-20 sm:w-20"
                  aria-label="Play lesson"
                >
                  <Play
                    size={24}
                    strokeWidth={1.5}
                    fill="currentColor"
                    className="ml-1 text-accent sm:h-7 sm:w-7"
                  />
                </button>
              </div>

              {/* Video controls */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12 sm:px-8"
              >
                <div className="mb-4 h-1 bg-white/25">
                  <div className="h-full w-[38%] bg-white" />
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/80">
                  <span>06:52 / {currentLessonData?.duration}</span>

                  <span>HD</span>
                </div>
              </div>
            </div>
          </section>

          {/* Lesson content */}
          <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-10 xl:grid-cols-[1fr_280px]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-accent">
                    Module 01
                  </span>

                  <span className="h-1 w-1 bg-line" />

                  <span className="text-[10px] text-muted">
                    Lesson {currentLesson}
                  </span>
                </div>

                <h2
                  className="editorial mt-4 max-w-3xl text-3xl leading-tight tracking-[-0.02em] text-ink sm:text-4xl"
                >
                  {currentLessonData?.title}
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
                  Great craftsmanship begins with understanding the relationship
                  between your hands, your tools, and the material in front of
                  you. In this lesson, we explore the fundamentals of working
                  with intention and developing a more thoughtful making
                  process.
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                  Pay attention to how small decisions affect the final
                  character of an object. The goal is not simply to complete a
                  task, but to understand why each step matters.
                </p>

                {/* Lesson resource */}
                <div
                  className="mt-8 flex max-w-3xl items-center justify-between border border-line bg-paper-light p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center border border-line bg-paper"
                    >
                      <FileText
                        size={16}
                        strokeWidth={1.5}
                        className="text-accent"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-ink">
                        Lesson notes
                      </p>

                      <p className="mt-0.5 text-[10px] text-muted">
                        PDF · 2 pages
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-[10px] font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-dark"
                  >
                    Open
                  </button>
                </div>

                {/* Completion */}
                <div className="mt-10 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Have you finished this lesson?
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Mark it complete to keep your learning progress updated.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={markComplete}
                    disabled={completedLessons.includes(currentLesson)}
                    className={`inline-flex w-fit items-center gap-2 px-5 py-3 text-xs font-semibold transition ${
                      completedLessons.includes(currentLesson)
                        ? "border border-line bg-paper-light text-accent"
                        : "bg-accent text-paper hover:bg-accent-dark"
                    }`}
                  >
                    <Check size={15} strokeWidth={1.7} />

                    {completedLessons.includes(currentLesson)
                      ? "Lesson completed"
                      : "Mark as complete"}
                  </button>
                </div>
              </div>

              {/* Lesson information */}
              <aside className="xl:border-l xl:border-line xl:pl-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-muted">
                  About this lesson
                </p>

                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-[10px] text-muted">Duration</p>
                    <p className="mt-1 text-sm text-ink">
                      {currentLessonData?.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-muted">Course</p>
                    <p className="mt-1 text-sm leading-5 text-ink">
                      Foundations of Fine Craftsmanship
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-muted">Your progress</p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1 flex-1 bg-line">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <span className="text-[10px] font-semibold text-accent">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* Previous / Next */}
          <section className="border-t border-line px-5 py-6 sm:px-8 lg:px-12">
            <div
              className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between"
            >
              <button
                type="button"
                disabled={!previousLesson}
                onClick={() =>
                  previousLesson && selectLesson(previousLesson.id)
                }
                className={`group flex items-center gap-3 text-left ${
                  previousLesson ? "text-ink" : "cursor-not-allowed text-muted/40"
                }`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center border border-line transition group-hover:border-line-dark"
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">
                    Previous
                  </p>

                  <p className="mt-1 max-w-[220px] text-xs">
                    {previousLesson?.title || "No previous lesson"}
                  </p>
                </div>
              </button>

              <button
                type="button"
                disabled={!nextLesson}
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                className={`group flex items-center gap-3 text-right sm:flex-row-reverse ${
                  nextLesson ? "text-ink" : "cursor-not-allowed text-muted/40"
                }`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center border border-line transition group-hover:border-line-dark"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">
                    Next lesson
                  </p>

                  <p className="mt-1 max-w-[220px] text-xs">
                    {nextLesson?.title || "Course complete"}
                  </p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}