"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getLanguage, Language, setLanguage } from "./config";

type LangContextType = {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextType | undefined>(undefined);

import { t as translateFn } from "./config";

function translate(lang: Language, key: string, params?: Record<string, string | number>): string {
  return translateFn(lang, key, params);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const l = getLanguage();
    setLangState(l);
    // set document attributes inline
    if (typeof window !== "undefined") {
      document.documentElement.lang = l === "am" ? "am" : "en";
      document.documentElement.setAttribute("data-lang", l);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("sebeb-lang", l);
      document.documentElement.lang = l === "am" ? "am" : "en";
      document.documentElement.setAttribute("data-lang", l);
    }
  };

  const toggleLang = () => {
    const next = lang === "en" ? "am" : "en";
    setLang(next);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    return translate(lang, key, params);
  };

  const dir = "ltr";

  return (
    <LangContext.Provider value={{ lang, toggleLang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}