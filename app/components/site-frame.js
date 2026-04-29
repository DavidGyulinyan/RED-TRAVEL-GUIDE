"use client";

import Link from "next/link";
import { useI18n } from "./i18n-provider";

export default function SiteFrame({ children }) {
  const { lang, setLang, t } = useI18n();

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand">
            {t("brand.name")}
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/">{t("nav.home")}</Link>
            <Link href="/tours">{t("nav.tours")}</Link>
            <Link href="/gallery">{t("nav.gallery")}</Link>
            <Link href="/about">{t("nav.about")}</Link>
            <Link href="/contact">{t("nav.contact")}</Link>
          </nav>
          <div className="lang-switcher" role="group" aria-label="Language switcher">
            <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button type="button" className={lang === "am" ? "active" : ""} onClick={() => setLang("am")}>
              Հայ
            </button>
            <button type="button" className={lang === "ru" ? "active" : ""} onClick={() => setLang("ru")}>
              RU
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>{t("brand.footer")}</p>
          <p>{t("footer.regions")}</p>
        </div>
      </footer>
    </>
  );
}
