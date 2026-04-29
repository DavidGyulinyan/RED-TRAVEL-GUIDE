"use client";

import Link from "next/link";
import InstagramReelEmbed, { INSTAGRAM_REEL_SHORTCODES } from "./components/instagram-reel-embed";
import { useI18n } from "./components/i18n-provider";

export default function Home() {
  const { t } = useI18n();
  const highlights = [
    {
      title: "Volcanic Highlands Route",
      text: "Drive ancient lava plateaus and hidden valleys above the clouds.",
      image: "https://phoenixtour.org/wp-content/uploads/2021/04/18-ARMENIAN-NATURE.jpg",
    },
    {
      title: "Lake Sevan Panorama Trails",
      text: "Sunrise and sunset viewpoints over blue alpine waters and wild ridges.",
      image: "https://hyurservice.com/images/private_tours/1/16187533729532/860x460.webp",
    },
    {
      title: "Monastery and Mountain Loop",
      text: "Combine remote monasteries, canyons, and off-road village roads.",
      image: "https://bidfortrip.com/uploads/0000/32/2021/03/04/tour-kanchaqar-sanahin-haghpat-3.jpg",
    },
  ];

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">{t("home.eyebrow")}</p>
          <h1>{t("home.title")}</h1>
          <p>{t("home.subtitle")}</p>
          <div className="cta-row">
            <Link href="/tours" className="cta-primary">
              {t("home.ctaTours")}
            </Link>
            <Link href="/gallery" className="cta-secondary">
              {t("home.ctaGallery")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{t("home.featuredTitle")}</h2>
          <div className="card-grid">
            {highlights.map((item, index) => (
              <article key={item.title} className="tour-card">
                <img src={item.image} alt={item.title} />
                <div className="tour-card-body">
                  <h3>{t(`home.cards.${index}.title`)}</h3>
                  <p>{t(`home.cards.${index}.text`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <h2>{t("home.videoTitle")}</h2>
          <p className="section-text">{t("home.videoText")}</p>
          <div className="video-grid">
            {INSTAGRAM_REEL_SHORTCODES.map((shortcode, index) => (
              <InstagramReelEmbed
                key={shortcode}
                shortcode={shortcode}
                captionTitle={`Mountain Reel ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
