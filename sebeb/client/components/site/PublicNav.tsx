"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/formic/components/Button";
import DropdownMenu from "@/formic/components/DropdownMenu";
import { Icon, IconButton } from "@/formic/components/primitives";
import { useReducedMotion } from "@/formic/components/hooks";
import { useLang } from "@/lib/i18n/use-lang";
import LanguageToggle from "./LanguageToggle";

/* The public pages stand alone (AppShell rail="none"), so their navigation
   lives in the shell's header strip. The title slot holds the logo + wordmark;
   the actions slot holds primary navigation, language, auth buttons.
   The theme toggle is injected by AppShell. */

export type PublicNavItem = { href: string; label: string };

const SECTION_IDS = ["home", "belief", "crafts", "how-it-works", "courses", "about"];

export function PublicTitle() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href="/#home"
      onClick={(event) => {
        if (pathname !== "/") return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const el = document.getElementById("home");
        if (!el) return;
        event.preventDefault();
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        window.history.replaceState(null, "", "/#home");
      }}
      className="inline-flex items-center gap-2 shrink-0"
      aria-label="SEBEB home"
    >
      <Image
        src="/sebelogo.jpg"
        alt="SEBEB logo"
        width={80}
        height={80}
        priority
        className="h-6 w-auto object-contain"
      />
      <span className="text-sm font-medium text-ink hidden sm:inline">SEBEB</span>
    </Link>
  );
}

export default function PublicActions() {
  const pathname = usePathname();
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  const navItems: PublicNavItem[] = [
    { href: "/#home", label: t("nav.home") },
    { href: "/#belief", label: t("nav.ourStory") },
    { href: "/#crafts", label: t("nav.craft") },
    { href: "/#how-it-works", label: t("nav.howItWorks") },
    { href: "/#courses", label: t("nav.courses") },
    { href: "/#about", label: t("nav.contact") },
  ];

  function sectionId(href: string) {
    return href.startsWith("/#") ? href.slice(2) : null;
  }

  const [active, setActive] = useState("home");
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 1] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const goToSection = (href: string) => {
    const id = sectionId(href);
    if (!id || !onHome) return false;
    const el = document.getElementById(id);
    if (!el) return false;
    setActive(id);
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    return true;
  };

  const isActive = (href: string) => {
    const id = sectionId(href);
    if (id) return onHome && active === id;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex items-center gap-6 public-actions">
      {/* Primary navigation - center */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "true" : undefined}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              if (goToSection(item.href)) event.preventDefault();
            }}
            className={`rounded-control px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 ${
              isActive(item.href)
                ? "bg-hover-2 text-ink underline decoration-accent decoration-2"
                : "text-ink-2 hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu button */}
      <DropdownMenu
        align="end"
        items={[
          ...navItems.map((item) => ({ key: item.href, label: item.label })),
          { type: "divider" as const },
          { key: "/login", label: t("nav.login") },
          { key: "/courses", label: t("nav.exploreCraft") },
        ]}
        onSelect={(key) => {
          const id = sectionId(key);
          if (id && onHome) {
            goToSection(key);
          } else {
            window.location.href = key;
          }
        }}
      >
        <IconButton label="Open navigation" className="text-ink-2 hover:bg-hover-2 hover:text-ink md:hidden">
          <Icon name="lines" size={16} strokeWidth={1.8} />
        </IconButton>
      </DropdownMenu>

      <LanguageToggle />

      <Button href="/login" variant="outline" size="sm" className="h-9 px-4">
        {t("nav.login")}
      </Button>
      <Button href="/courses" variant="accent" size="sm" iconEnd="arrow-right" className="h-9 px-4">
        {t("nav.exploreCraft")}
      </Button>
    </div>
  );
}
