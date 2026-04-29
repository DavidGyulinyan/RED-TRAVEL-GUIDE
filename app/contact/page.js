"use client";

import { useState } from "react";
import { useI18n } from "../components/i18n-provider";

const WHATSAPP_NUMBER = "374000000000";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function ContactPage() {
  const { t } = useI18n();
  const [message, setMessage] = useState("");
  const quickMessages = [
    { label: t("contact.quick.0.label"), text: t("contact.quick.0.text") },
    { label: t("contact.quick.1.label"), text: t("contact.quick.1.text") },
    { label: t("contact.quick.2.label"), text: t("contact.quick.2.text") },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = `${encodeURIComponent(t("contact.greeting"))}%0A%0A${encodeURIComponent(
      t("contact.details")
    )}: ${encodeURIComponent(
      message || "-"
    )}`;

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${text}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container contact-grid">
          <div className="prose">
            <h1>{t("contact.title")}</h1>
            <p>{t("contact.text")}</p>
            <div className="contact-cards">
              <article className="contact-card">
                <h3>{t("contact.cards.whatsappTitle")}</h3>
                <p>+374 00 000 000</p>
                <a href={WHATSAPP_BASE_URL} target="_blank" rel="noreferrer">
                  {t("contact.cards.whatsappAction")}
                </a>
              </article>
              <article className="contact-card">
                <h3>{t("contact.cards.responseTitle")}</h3>
                <p>{t("contact.cards.responseMain")}</p>
                <span>{t("contact.cards.responseSub")}</span>
              </article>
              <article className="contact-card">
                <h3>{t("contact.cards.pickupTitle")}</h3>
                <p>{t("contact.cards.pickupMain")}</p>
                <span>{t("contact.cards.pickupSub")}</span>
              </article>
            </div>
            <div className="quick-actions">
              <h2>{t("contact.quickTitle")}</h2>
              <p>{t("contact.quickText")}</p>
              <div className="quick-actions-row">
                {quickMessages.map((item) => (
                  <a
                    key={item.label}
                    className="quick-action-chip"
                    href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(item.text)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="booking-note">
              <h3>{t("contact.noteTitle")}</h3>
              <ul>
                <li>{t("contact.note.0")}</li>
                <li>{t("contact.note.1")}</li>
                <li>{t("contact.note.2")}</li>
                <li>{t("contact.note.3")}</li>
              </ul>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>{t("contact.formTitle")}</h2>
            <label htmlFor="message">{t("contact.details")}</label>
            <textarea
              id="message"
              name="message"
              rows="7"
              placeholder="Dates, number of people, preferred tour..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />

            <button type="submit">{t("contact.button")}</button>
            <p className="form-help">
              {t("contact.help")}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
