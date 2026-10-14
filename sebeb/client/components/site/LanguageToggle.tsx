"use client";

import DropdownMenu from "@/formic/components/DropdownMenu";
import { Icon, IconButton } from "@/formic/components/primitives";
import { useLang } from "@/lib/i18n/use-lang";

/* The language switch: a setting that flips the moment it is chosen, so the
   current language sits on the trigger and each option marks itself with a
   check. A globe button keeps the strip's actions one size on every page. */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <DropdownMenu
      align="end"
      items={[
        { key: "en", label: "English", icon: lang === "en" ? "check" : undefined },
        { key: "am", label: "አማርኛ", icon: lang === "am" ? "check" : undefined },
      ]}
      onSelect={(key) => {
        if (key === "en" || key === "am") setLang(key);
      }}
    >
      <IconButton label="Change language" className={`text-ink-2 hover:bg-hover-2 hover:text-ink ${className}`}>
        <Icon name="language" size={15} strokeWidth={1.8} />
      </IconButton>
    </DropdownMenu>
  );
}
