"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages } from "../i18n/messages";

const I18nContext = createContext(null);

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("rtg-lang");
    if (saved && messages[saved]) {
      setLang(saved);
    }
  }, []);

  const value = useMemo(() => {
    const t = (key) => {
      const current = getByPath(messages[lang], key);
      if (current !== undefined) return current;
      const fallback = getByPath(messages.en, key);
      return fallback !== undefined ? fallback : key;
    };

    const changeLanguage = (nextLang) => {
      if (!messages[nextLang]) return;
      setLang(nextLang);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("rtg-lang", nextLang);
      }
    };

    return { lang, setLang: changeLanguage, t };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
