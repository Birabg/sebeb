"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlideMenu, Icon, IconButton, Separator, type IconName } from "@/formic/components/primitives";
import { useLang } from "@/lib/i18n/use-lang";
import LanguageToggle from "@/components/site/LanguageToggle";

type DashboardSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

type NavItem = { label: string; href: string; icon: IconName };

export default function DashboardSidebar({
  mobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { t } = useLang();

  const navigation: NavItem[] = [
    { label: t("dashboard.overview"), href: "/dashboard", icon: "home" },
    { label: t("nav.myLearning"), href: "/dashboard/learning", icon: "layers" },
    { label: t("nav.myProjects"), href: "/dashboard/learning", icon: "scissors" },
    { label: t("dashboard.browseCrafts"), href: "/courses", icon: "search" },
    { label: t("nav.certificates"), href: "/dashboard/certificates", icon: "trophy" },
  ];

  const isActiveHref = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  /* two entries can share a page (learning and projects), so only the first
     match lights up: one page, one highlighted row */
  const activeIndex = navigation.findIndex((item) => isActiveHref(item.href));
  const settingsActive = pathname.startsWith("/dashboard/settings");

  const rowClass = (on: boolean) =>
    `relative z-10 flex h-9 w-full items-center gap-2.5 rounded-control px-2.5 text-body font-medium transition-colors duration-150 ${
      on ? "bg-hover-2 text-ink" : "text-ink-2 hover:text-ink"
    }`;

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          style={{ animation: "fade-in 200ms ease-out both" }}
        />
      )}

      <aside
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-65 flex-col border-r border-line bg-sidebar transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-overlay" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-quint)" }}
      >
        <div className="flex h-17 shrink-0 items-center justify-between border-b border-line px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 rounded-control"
          >
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-control bg-surface shadow-btn">
              <img
                src="/sebelogo.jpg"
                alt="SEBEB logo"
                className="h-5 w-auto object-contain"
              />
            </span>

            <span className="min-w-0">
              <span className="block text-lead font-semibold leading-none tracking-tight text-ink">
                SEBEB
              </span>
              <span className="mt-1 block truncate text-micro font-medium uppercase tracking-wide text-ink-3">
                {t("nav.yourWorkshop")}
              </span>
            </span>
          </Link>

          <IconButton
            label="Close menu"
            onClick={onClose}
            className="size-9 text-ink-3 hover:bg-hover-2 hover:text-ink lg:hidden"
          >
            <Icon name="close" size={16} strokeWidth={2} />
          </IconButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-4 flex items-center justify-between px-2 lg:hidden">
            <span className="text-small font-medium text-ink-3">
              {t("common.language")}
            </span>
            <LanguageToggle />
          </div>

          <p className="mb-1.5 px-2.5 text-micro font-medium uppercase tracking-wide text-ink-3">
            {t("nav.workspace")}
          </p>

          <nav aria-label="Workspace">
            <GlideMenu className="flex flex-col gap-0.5">
              {navigation.map((item, index) => {
                const active = index === activeIndex;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-menu-row
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    className={rowClass(active)}
                  >
                    <Icon
                      name={item.icon}
                      size={16}
                      strokeWidth={2}
                      className={`shrink-0 ${active ? "text-accent" : ""}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </GlideMenu>
          </nav>

          <Separator className="my-5" />

          <p className="mb-1.5 px-2.5 text-micro font-medium uppercase tracking-wide text-ink-3">
            {t("nav.account")}
          </p>

          <GlideMenu className="flex flex-col gap-0.5">
            <Link
              href="/dashboard/settings"
              data-menu-row
              aria-current={settingsActive ? "page" : undefined}
              onClick={onClose}
              className={rowClass(settingsActive)}
            >
              <Icon
                name="gear"
                size={16}
                strokeWidth={2}
                className={`shrink-0 ${settingsActive ? "text-accent" : ""}`}
              />
              <span className="truncate">{t("nav.settings")}</span>
            </Link>
          </GlideMenu>
        </div>

        <div className="shrink-0 border-t border-line p-3">
          <button
            type="button"
            className="flex h-9 w-full items-center gap-2.5 rounded-control px-2.5 text-body font-medium text-ink-2 transition-colors duration-150 hover:bg-hover-2 hover:text-ink"
          >
            <Icon name="sign-out" size={16} strokeWidth={2} className="shrink-0" />
            <span>{t("nav.signOut")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
