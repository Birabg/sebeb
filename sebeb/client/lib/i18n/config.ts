import { en } from "./en";
import { am } from "./am";

export type Language = "en" | "am";

export type Translation = typeof en;

const translations: Record<Language, Translation> = {
  en,
  am,
};

const STORAGE_KEY = "sebeb-lang";

export function getLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "am") {
    return stored;
  }
  return "en";
}

export function setLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "am" ? "am" : "en";
    document.documentElement.setAttribute("data-lang", lang);
  }
}

export function getTranslations(lang: Language): Translation {
  return translations[lang] || translations.en;
}

export function t(lang: Language, key: string, params?: Record<string, string | number>): string {
  const keys = key.split(".");
  let value: unknown = translations[lang] || translations.en;
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
    if (value === undefined) break;
  }
  if (value === undefined || typeof value !== "string") {
    // fallback to en
    let fallback: unknown = translations.en;
    for (const k of keys) {
      fallback = (fallback as Record<string, unknown>)?.[k];
      if (fallback === undefined) break;
    }
    value = typeof fallback === "string" ? fallback : key;
  }
  let result = value as string;
  if (params) {
    Object.entries(params).forEach(([p, v]) => {
      result = result.replace(new RegExp(`{${p}}`, "g"), String(v));
    });
  }
  return result;
}

export function getDirection(lang: Language): "ltr" | "rtl" {
  return "ltr";
}