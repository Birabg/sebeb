"use client";

import { useRouter } from "next/navigation";
import DropdownMenu from "@/formic/components/DropdownMenu";
import { useLang } from "@/lib/i18n/use-lang";
import {
  Avatar,
  Icon,
  IconButton,
  Separator,
  Shortcut,
  Tooltip,
} from "@/formic/components/primitives";
import LanguageToggle from "@/components/site/LanguageToggle";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
};

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const router = useRouter();
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-30 flex h-17 items-center justify-between gap-4 border-b border-line bg-surface/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <IconButton
          label="Open navigation"
          onClick={onMenuClick}
          className="size-9 text-ink-2 hover:bg-hover-2 hover:text-ink lg:hidden"
        >
          <Icon name="lines" size={18} strokeWidth={2} />
        </IconButton>

        <label className="corner-smooth relative hidden h-9 w-80 items-center rounded-control bg-field shadow-field transition-shadow duration-150 focus-within:shadow-[0_0_0_1.5px_var(--accent)] md:flex">
          <span className="sr-only">Search your learning</span>

          <Icon
            name="search"
            size={15}
            strokeWidth={2}
            className="pointer-events-none absolute left-3 text-ink-3"
          />

          <input
            type="search"
            placeholder="Search your learning..."
            className="h-full w-full bg-transparent pl-9 pr-14 text-body text-ink outline-none placeholder:text-ink-3"
          />

          <Shortcut keys={["⌘", "K"]} className="pointer-events-none absolute right-2.5" />
        </label>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <LanguageToggle className="hidden size-9 sm:flex" />

        <Tooltip label="Notifications">
          <IconButton
            label="Notifications"
            className="relative size-9 text-ink-2 hover:bg-hover-2 hover:text-ink"
          >
            <Icon name="bell" size={17} strokeWidth={2} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--surface)]" />
          </IconButton>
        </Tooltip>

        <Separator vertical className="mx-1.5 h-6" />

        <DropdownMenu
          align="end"
          items={[
            { key: "settings", label: t("nav.settings"), icon: "gear" },
            { key: "certificates", label: t("nav.certificates"), icon: "trophy" },
            { type: "divider" },
            { key: "signout", label: t("nav.signOut"), icon: "sign-out" },
          ]}
          onSelect={(key) => {
            if (key === "settings") router.push("/dashboard/settings");
            if (key === "certificates") router.push("/dashboard/certificates");
          }}
        >
          <button
            type="button"
            aria-label="Open profile"
            className="flex items-center gap-2.5 rounded-control py-1 pl-1 pr-2 transition-colors duration-150 hover:bg-hover-2"
          >
            <Avatar name="Bira Girma" size="lg" />

            <span className="hidden text-left sm:block">
              <span className="block text-caption font-medium leading-tight text-ink">
                Bira Girma
              </span>
              <span className="block text-small leading-tight text-ink-3">
                Student
              </span>
            </span>

            <Icon
              name="chevron"
              size={13}
              strokeWidth={2}
              className="hidden text-ink-3 sm:block"
            />
          </button>
        </DropdownMenu>
      </div>
    </header>
  );
}
