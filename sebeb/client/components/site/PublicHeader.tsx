"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/formic/components/Button";
import { Disclosure, Icon, IconButton, Separator } from "@/formic/components/primitives";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/lib/i18n/use-lang";

export default function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  const navigation = [
    { label: t("nav.explore"), href: "/#explore" },
    { label: t("nav.crafts"), href: "/#crafts" },
    { label: t("nav.courses"), href: "/courses" },
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.about"), href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/courses") return pathname.startsWith("/courses");
    if (href === "/about") return pathname.startsWith("/about");
    return false;
  };

  const close = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-17 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={close}
          aria-label="SEBEB home"
          className="group flex shrink-0 items-center gap-2.5 rounded-control"
        >
          <img
            src="/sebeb-logo.png"
            alt="SEBEB"
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`corner-smooth rounded-control px-3 py-1.5 text-caption font-medium transition-colors duration-150 ${
                  active
                    ? "bg-hover-2 text-ink"
                    : "text-ink-2 hover:bg-hover hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />

          <Separator vertical className="mx-1 h-5" />

          <Button href="/login" variant="ghost" size="md">
            {t("nav.login")}
          </Button>

          <Button href="/courses" variant="accent" size="md" iconEnd="arrow-right">
            {t("nav.startLearning")}
          </Button>
        </div>

        <IconButton
          label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="size-10 text-ink hover:bg-hover-2 lg:hidden"
        >
          <Icon name={menuOpen ? "close" : "lines"} size={18} strokeWidth={2} />
        </IconButton>
      </div>

      <Disclosure open={menuOpen} duration={320} className="lg:hidden">
        <div className="mx-auto w-full max-w-7xl border-t border-line px-5 pb-6 pt-3 sm:px-8">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group flex items-center justify-between border-b border-line py-4 last:border-b-0"
              >
                <span className="flex items-center gap-4">
                  <span className="w-5 font-mono text-tiny text-ink-3">
                    0{index + 1}
                  </span>
                  <span
                    className={`text-lead font-medium transition-colors ${
                      isActive(item.href) ? "text-accent" : "text-ink group-hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>

                <Icon
                  name="arrow-right"
                  size={15}
                  strokeWidth={2}
                  className="text-ink-3 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center justify-between rounded-control bg-inset px-4 py-2.5">
            <span className="flex items-center gap-2.5 text-caption font-medium text-ink-2">
              <Icon name="language" size={15} strokeWidth={1.8} />
              {t("common.language")}
            </span>
            <LanguageToggle />
          </div>

          <div className="mt-4 grid gap-2.5">
            <Button href="/login" variant="outline" size="lg" fullWidth onClick={close}>
              {t("nav.login")}
            </Button>

            <Button
              href="/courses"
              variant="accent"
              size="lg"
              iconEnd="arrow-right"
              fullWidth
              onClick={close}
            >
              {t("nav.startLearning")}
            </Button>
          </div>
        </div>
      </Disclosure>
    </header>
  );
}
