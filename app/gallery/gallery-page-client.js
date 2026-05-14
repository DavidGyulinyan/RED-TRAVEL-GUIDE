"use client";

import Image from "next/image";
import { galleryPhotos } from "../gallery-photos";
import InstagramReelEmbed, { INSTAGRAM_REEL_SHORTCODES } from "../components/instagram-reel-embed";
import { useI18n } from "../components/i18n-provider";

export default function GalleryPageClient({ videos }) {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <h1>{t("gallery.title")}</h1>
          <p className="section-text">{t("gallery.text")}</p>
          <div className="photo-grid">
            {galleryPhotos.map((photo, index) => (
              <figure key={photo.src} className={`photo-card photo-card--${photo.layout}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading={index === 0 ? "eager" : undefined}
                  sizes="(max-width: 780px) 92vw, (max-width: 1100px) 46vw, 30vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>{t("gallery.videoTitle")}</h2>
            <p className="section-text">{t("gallery.videoText")}</p>
            <div className="local-video-grid">
              {videos.map((video, index) => (
                <article key={video.file} className="local-video-card">
                  <div className="local-video-frame">
                    <video controls preload="metadata" playsInline src={video.src} />
                  </div>
                  <div className="local-video-meta">
                    <p>
                      {t("gallery.clipLabel")} {index + 1}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section dark">
        <div className="container">
          <h2>{t("gallery.reelTitle")}</h2>
          <p className="section-text">{t("gallery.reelText")}</p>
          <div className="video-grid">
            {INSTAGRAM_REEL_SHORTCODES.map((shortcode, index) => (
              <InstagramReelEmbed
                key={shortcode}
                shortcode={shortcode}
                captionTitle={`${t("gallery.reelLabel")} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
