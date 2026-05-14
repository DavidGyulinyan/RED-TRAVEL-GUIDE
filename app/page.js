"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryPhotos } from "./gallery-photos";
import InstagramReelEmbed, { INSTAGRAM_REEL_SHORTCODES } from "./components/instagram-reel-embed";
import { useI18n } from "./components/i18n-provider";

const HERO_VIDEO_SOURCES = [
  "/videos/video_2026-05-15_00-23-10%20(2).mp4",
  "/videos/video_2026-05-15_00-23-10%20(3).mp4",
  "/videos/video_2026-05-15_00-23-10%20(4).mp4",
  "/videos/video_2026-05-15_00-23-10%20(5).mp4",
  "/videos/video_2026-05-15_00-23-10%20(6).mp4",
  "/videos/video_2026-05-15_00-23-10%20(7).mp4",
  "/videos/video_2026-05-15_00-23-10%20(8).mp4",
  "/videos/video_2026-05-15_00-23-10%20(9).mp4",
  "/videos/video_2026-05-15_00-23-10.mp4",
];

const HERO_START_INDEX = 6;

export default function Home() {
  const { t } = useI18n();
  const [activeHeroVideoIndex, setActiveHeroVideoIndex] = useState(HERO_START_INDEX);
  const heroVideoSrc = HERO_VIDEO_SOURCES[activeHeroVideoIndex];
  const highlights = [
    {
      id: "lake-reflection",
      image: galleryPhotos[11].src,
      alt: galleryPhotos[11].alt,
    },
    {
      id: "fog-cliffs",
      image: galleryPhotos[10].src,
      alt: galleryPhotos[10].alt,
    },
    {
      id: "alpine-lake",
      image: galleryPhotos[12].src,
      alt: galleryPhotos[12].alt,
    },
  ];

  const showNextHeroVideo = () => {
    setActiveHeroVideoIndex((currentIndex) => (currentIndex + 1) % HERO_VIDEO_SOURCES.length);
  };

  return (
    <div className="page-shell">
      <section className="hero">
        <video
          key={heroVideoSrc}
          className="hero-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onEnded={showNextHeroVideo}
          onError={showNextHeroVideo}
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{t("home.featuredTitle")}</h2>
          <div className="card-grid">
            {highlights.map((item, index) => (
              <article key={item.id} className="tour-card">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={720}
                  height={440}
                  sizes="(max-width: 780px) 92vw, 33vw"
                />
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
