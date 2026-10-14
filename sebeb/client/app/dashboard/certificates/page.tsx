"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Eye,
  Menu,
  ShieldCheck,
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const certificates = [
  {
    id: "SEBEB-FC-2026-001",
    title: "Foundations of Fine Craftsmanship",
    category: "Craft & Making",
    completedAt: "September 18, 2026",
    instructor: "SEBEB Learning",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "SEBEB-CM-2026-002",
    title: "Creative Making with Intention",
    category: "Creative Skills",
    completedAt: "August 29, 2026",
    instructor: "SEBEB Learning",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <DashboardSidebar />

      <div className="lg:pl-[250px]">
        <DashboardHeader />

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1400px]">
            {/* Page header */}
            <section className="border-b border-line pb-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                    Your achievements
                  </p>

              <h1 className="editorial text-4xl leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl md:text-6xl">
                Certificates of Craft
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                A record of craftsmanship achieved through your completed journeys.
              </p>
                </div>

                <Link
                  href="/courses"
                  className="group inline-flex w-fit items-center gap-2 border border-olive px-5 py-3 text-xs font-semibold text-olive transition hover:bg-olive hover:text-paper"
                >
                  Explore more courses
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>

            {/* Overview */}
            <section className="grid border-b border-line sm:grid-cols-3">
              <div className="border-b border-line px-1 py-7 sm:border-b-0 sm:border-r sm:px-6 lg:px-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Certificates earned
                    </p>

                    <p className="mt-3 text-3xl font-medium tracking-tight text-ink">
                      02
                    </p>
                  </div>

                  <Award
                    size={21}
                    strokeWidth={1.4}
                    className="text-olive"
                  />
                </div>
              </div>

              <div className="border-b border-line px-1 py-7 sm:border-b-0 sm:border-r sm:px-6 lg:px-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Learning status
                    </p>

                    <p className="mt-3 text-3xl font-medium tracking-tight text-ink">
                      Active
                    </p>
                  </div>

                  <CheckCircle2
                    size={21}
                    strokeWidth={1.4}
                    className="text-olive"
                  />
                </div>
              </div>

              <div className="px-1 py-7 sm:px-6 lg:px-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Next milestone
                    </p>

                    <p className="mt-3 text-3xl font-medium tracking-tight text-ink">
                      03
                    </p>
                  </div>

                  <ShieldCheck
                    size={21}
                    strokeWidth={1.4}
                    className="text-olive"
                  />
                </div>
              </div>
            </section>

            {/* Certificates list */}
            <section className="pt-10">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive">
                    Your collection
                  </p>

                  <h2 className="mt-2 text-xl font-medium text-ink">
                    Earned certificates
                  </h2>
                </div>

                <span className="text-xs text-muted">
                  {certificates.length} certificates
                </span>
              </div>

              <div className="space-y-5">
                {certificates.map((certificate) => (
                  <article
                    key={certificate.id}
                    className="group border border-line bg-paper transition-colors hover:border-line-dark"
                  >
                    <div className="grid lg:grid-cols-[300px_1fr]">
                      {/* Certificate visual */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep lg:aspect-auto lg:min-h-[230px]">
                        <img
                          src={certificate.image}
                          alt={certificate.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-black/10" />

                        <div className="absolute left-5 top-5">
                          <div className="flex items-center gap-2 bg-paper px-3 py-2">
                            <Award
                              size={15}
                              strokeWidth={1.5}
                              className="text-olive"
                            />

                            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-olive">
                              Certificate earned
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Certificate information */}
                      <div className="flex flex-col justify-between p-6 sm:p-7 lg:p-8">
                        <div>
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-olive">
                                {certificate.category}
                              </p>

                              <h3 className="mt-2 max-w-2xl text-xl font-medium leading-7 text-ink">
                                {certificate.title}
                              </h3>

                              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                                Successfully completed this course and earned
                                a SEBEB certificate of completion.
                              </p>
                            </div>

                            <div className="hidden shrink-0 sm:block">
                              <div className="flex h-11 w-11 items-center justify-center border border-line">
                                <Award
                                  size={20}
                                  strokeWidth={1.4}
                                  className="text-olive"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-7 grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
                            <div>
                              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
                                <CalendarDays
                                  size={13}
                                  strokeWidth={1.5}
                                />
                                Completed
                              </div>

                              <p className="mt-2 text-sm text-ink">
                                {certificate.completedAt}
                              </p>
                            </div>

                            <div>
                              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
                                Certificate ID
                              </div>

                              <p className="mt-2 break-all font-mono text-xs text-ink-soft">
                                {certificate.id}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 bg-olive px-4 py-2.5 text-xs font-semibold text-paper transition hover:bg-olive-dark"
                          >
                            <Eye size={14} strokeWidth={1.5} />
                            View certificate
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-xs font-semibold text-ink transition hover:border-line-dark hover:bg-paper-light"
                          >
                            <ArrowDownToLine
                              size={14}
                              strokeWidth={1.5}
                            />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Bottom motivation */}
            <section className="mt-12 border-t border-line pt-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive">
                    Keep learning
                  </p>

                  <h2 className="editorial mt-3 max-w-2xl text-3xl leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                    Every completed course becomes part of your craft.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                    Continue exploring SEBEB courses and develop practical
                    skills that you can carry into your work and creative
                    practice.
                  </p>
                </div>

                <div className="flex justify-start lg:justify-end">
                  <Link
                    href="/courses"
                    className="group inline-flex items-center gap-2 text-xs font-semibold text-olive transition hover:text-olive-dark"
                  >
                    Browse the course library
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}