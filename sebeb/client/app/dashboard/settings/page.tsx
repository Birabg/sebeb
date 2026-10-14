"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [courseReminders, setCourseReminders] = useState(true);
  const [newCourses, setNewCourses] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DashboardSidebar />

      <div className="lg:pl-[250px]">
        <DashboardHeader />

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1200px]">
            {/* Header */}
            <section className="border-b border-line pb-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                Your account
              </p>

              <h1 className="editorial text-4xl leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl">
                Settings
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                Manage your profile, account preferences, notifications, and
                security settings.
              </p>
            </section>

            <div className="grid gap-10 pt-10 lg:grid-cols-[220px_1fr]">
              {/* Settings navigation */}
              <aside className="hidden lg:block">
                <nav className="sticky top-28">
                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Settings
                  </p>

                  <div className="space-y-1">
                    <a
                      href="#profile"
                      className="flex items-center justify-between border-l-2 border-olive bg-paper-light px-3 py-2.5 text-xs font-medium text-ink"
                    >
                      Profile
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </a>

                    <a
                      href="#notifications"
                      className="flex items-center justify-between border-l-2 border-transparent px-3 py-2.5 text-xs text-muted transition hover:border-line-dark hover:text-ink"
                    >
                      Notifications
                    </a>

                    <a
                      href="#security"
                      className="flex items-center justify-between border-l-2 border-transparent px-3 py-2.5 text-xs text-muted transition hover:border-line-dark hover:text-ink"
                    >
                      Security
                    </a>
                  </div>
                </nav>
              </aside>

              {/* Main settings */}
              <div className="min-w-0 space-y-12">
                {/* Profile */}
                <section id="profile">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper-light">
                      <UserRound
                        size={18}
                        strokeWidth={1.5}
                        className="text-olive"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-ink">
                        Profile information
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Update the information associated with your SEBEB
                        account.
                      </p>
                    </div>
                  </div>

                  <div className="border border-line bg-paper">
                    <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-7">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                        >
                          First name
                        </label>

                        <input
                          id="firstName"
                          type="text"
                          defaultValue="Bira"
                          className="w-full border border-line bg-paper-light px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-olive"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                        >
                          Last name
                        </label>

                        <input
                          id="lastName"
                          type="text"
                          defaultValue="Girma"
                          className="w-full border border-line bg-paper-light px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-olive"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
                        >
                          Email address
                        </label>

                        <div className="relative">
                          <Mail
                            size={16}
                            strokeWidth={1.5}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                          />

                          <input
                            id="email"
                            type="email"
                            defaultValue="bira@example.com"
                            className="w-full border border-line bg-paper-light py-3 pl-10 pr-3.5 text-sm text-ink outline-none transition focus:border-olive"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-line bg-paper-light px-6 py-4 sm:px-7">
                      <p className="text-[11px] text-muted">
                        Your profile information is private.
                      </p>

                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 bg-olive px-4 py-2.5 text-xs font-semibold text-paper transition hover:bg-olive-dark"
                      >
                        {saved ? (
                          <>
                            <Check size={14} strokeWidth={1.7} />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save size={14} strokeWidth={1.5} />
                            Save changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Notifications */}
                <section id="notifications">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper-light">
                      <Bell
                        size={18}
                        strokeWidth={1.5}
                        className="text-olive"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-ink">
                        Notifications
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Choose what you want to hear from SEBEB.
                      </p>
                    </div>
                  </div>

                  <div className="border border-line">
                    <SettingToggle
                      title="Email updates"
                      description="Receive important account and platform updates."
                      enabled={emailUpdates}
                      onChange={setEmailUpdates}
                    />

                    <SettingToggle
                      title="Course reminders"
                      description="Get reminders when you have unfinished learning."
                      enabled={courseReminders}
                      onChange={setCourseReminders}
                    />

                    <SettingToggle
                      title="New course announcements"
                      description="Be notified when new courses become available."
                      enabled={newCourses}
                      onChange={setNewCourses}
                      last
                    />
                  </div>
                </section>

                {/* Security */}
                <section id="security">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper-light">
                      <LockKeyhole
                        size={18}
                        strokeWidth={1.5}
                        className="text-olive"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-ink">
                        Security
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Manage your password and account security.
                      </p>
                    </div>
                  </div>

                  <div className="border border-line">
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between p-6 text-left transition hover:bg-paper-light sm:p-7"
                    >
                      <div className="flex items-start gap-4">
                        <ShieldCheck
                          size={18}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-olive"
                        />

                        <div>
                          <p className="text-sm font-medium text-ink">
                            Change password
                          </p>

                          <p className="mt-1 text-xs leading-5 text-muted">
                            Update your password to keep your account secure.
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        size={17}
                        strokeWidth={1.5}
                        className="text-muted transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>

                  <div className="mt-6 flex items-start gap-3 border border-line bg-paper-light p-5">
                    <ShieldCheck
                      size={17}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-olive"
                    />

                    <div>
                      <p className="text-xs font-medium text-ink">
                        Your account is protected
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-muted">
                        Authentication and account security will be connected
                        to the SEBEB backend when the API is integrated.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

type SettingToggleProps = {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  last?: boolean;
};

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
  last = false,
}: SettingToggleProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 p-6 sm:p-7 ${
        !last ? "border-b border-line" : ""
      }`}
    >
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>

        <p className="mt-1 max-w-lg text-xs leading-5 text-muted">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`${title}: ${enabled ? "on" : "off"}`}
        className={`relative h-6 w-11 shrink-0 transition ${
          enabled ? "bg-olive" : "bg-line-dark"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 bg-paper transition-transform ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}