"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "./i18n-provider";

export default function SiteFrame({ children }) {
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand">
            {t("brand.name")}
          </Link>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <div id="mobile-navigation" className={`header-actions ${menuOpen ? "open" : ""}`}>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/" onClick={handleNavClick}>
                {t("nav.home")}
              </Link>
              <Link href="/tours" onClick={handleNavClick}>
                {t("nav.tours")}
              </Link>
              <Link href="/gallery" onClick={handleNavClick}>
                {t("nav.gallery")}
              </Link>
              <Link href="/about" onClick={handleNavClick}>
                {t("nav.about")}
              </Link>
              <Link href="/contact" onClick={handleNavClick}>
                {t("nav.contact")}
              </Link>
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
