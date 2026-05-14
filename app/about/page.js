"use client";

import { useI18n } from "../components/i18n-provider";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container about-grid">
          <div className="prose">
            <h1>{t("about.title")}</h1>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <div className="stats-row">
              <div className="stat">
                <strong>{t("about.stats.0.value")}</strong>
                <span>{t("about.stats.0.label")}</span>
              </div>
              <div className="stat">
                <strong>{t("about.stats.1.value")}</strong>
                <span>{t("about.stats.1.label")}</span>
              </div>
              <div className="stat">
                <strong>{t("about.stats.2.value")}</strong>
                <span>{t("about.stats.2.label")}</span>
              </div>
            </div>
          </div>

          <aside className="about-side-panel">
            <h2>{t("about.whyTitle")}</h2>
            <ul>
              <li>{t("about.why.0")}</li>
              <li>{t("about.why.1")}</li>
              <li>{t("about.why.2")}</li>
              <li>{t("about.why.3")}</li>
            </ul>
            <a
              className="about-whatsapp-btn"
              href="https://wa.me/37498338636"
              target="_blank"
              rel="noreferrer"
            >
              {t("about.whatsapp")}
            </a>
          </aside>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <h2>{t("about.teamTitle")}</h2>
          <div className="about-feature-grid">
            <article className="about-feature-card">
              <h3>{t("about.features.0.title")}</h3>
              <p>{t("about.features.0.text")}</p>
            </article>
            <article className="about-feature-card">
              <h3>{t("about.features.1.title")}</h3>
              <p>{t("about.features.1.text")}</p>
            </article>
            <article className="about-feature-card">
              <h3>{t("about.features.2.title")}</h3>
              <p>{t("about.features.2.text")}</p>
            </article>
            <article className="about-feature-card">
              <h3>{t("about.features.3.title")}</h3>
              <p>{t("about.features.3.text")}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
