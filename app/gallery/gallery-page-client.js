"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "../gallery-photos";
import InstagramReelEmbed, { INSTAGRAM_REEL_SHORTCODES } from "../components/instagram-reel-embed";
import { useI18n } from "../components/i18n-provider";

const photoItems = galleryPhotos.map((photo) => ({
  ...photo,
  mediaType: "photo",
}));

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 15 7-7 7 7" />
    </svg>
  );
}

export default function GalleryPageClient({ videos, emotionPhotos }) {
  const { t } = useI18n();
  const [lightboxState, setLightboxState] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const experienceMoments = Array.isArray(t("gallery.experienceMoments"))
    ? t("gallery.experienceMoments")
    : [];

  const emotionItems = useMemo(
    () =>
      emotionPhotos.map((photo, index) => ({
        ...photo,
        mediaType: "photo",
        alt: `${t("gallery.emotionPhotoLabel")} ${index + 1}`,
      })),
    [emotionPhotos, t]
  );

  const videoItems = useMemo(
    () =>
      videos.map((video, index) => ({
        ...video,
        mediaType: "video",
        title: `${t("gallery.clipLabel")} ${index + 1}`,
      })),
    [t, videos]
  );

  const activeItems =
    lightboxState?.group === "videos"
      ? videoItems
      : lightboxState?.group === "emotions"
        ? emotionItems
        : photoItems;
  const activeItem = lightboxState ? activeItems[lightboxState.index] : null;

  const openLightbox = (group, index) => {
    setLightboxState({ group, index });
  };

  const closeLightbox = useCallback(() => {
    setLightboxState(null);
  }, []);

  const stepLightbox = useCallback(
    (delta) => {
      setLightboxState((current) => {
        if (!current) return current;

        const items =
          current.group === "videos" ? videoItems : current.group === "emotions" ? emotionItems : photoItems;
        if (items.length === 0) return current;

        return {
          ...current,
          index: (current.index + delta + items.length) % items.length,
        };
      });
    },
    [emotionItems, videoItems]
  );

  useEffect(() => {
    if (!lightboxState) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        stepLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        stepLightbox(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightboxState, stepLightbox]);

  useEffect(() => {
    const updateScrollTopVisibility = () => {
      setShowScrollTop(window.scrollY > 480);
    };

    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollTopVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const counterLabel = activeItem
    ? `${activeItem.mediaType === "video" ? t("gallery.clipLabel") : t("gallery.photoLabel")} ${
        lightboxState.index + 1
      } / ${activeItems.length}`
    : "";

  const captionLabel = activeItem
    ? activeItem.mediaType === "video"
      ? activeItem.title
      : activeItem.alt
    : "";

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <div className="gallery-page-intro">
            <h1>{t("gallery.title")}</h1>
            <p className="section-text">{t("gallery.text")}</p>
          </div>

          <div className="gallery-section-card gallery-section-card--glow">
            <div className="gallery-experience-panel">
              <div className="gallery-section-head">
                <div>
                  <h2>{t("gallery.experienceTitle")}</h2>
                  <p className="section-text gallery-experience-text">{t("gallery.experienceText")}</p>
                </div>
              </div>
              <div className="gallery-emotion-list">
                {experienceMoments.map((moment) => (
                  <span key={moment} className="gallery-emotion-chip">
                    {moment}
                  </span>
                ))}
              </div>

              {emotionItems.length > 0 && (
                <div className="gallery-emotions-grid">
                  {emotionItems.map((photo, index) => (
                    <figure key={photo.src} className="gallery-emotion-card">
                      <button
                        type="button"
                        className="gallery-media-button"
                        onClick={() => openLightbox("emotions", index)}
                        aria-label={`${t("gallery.openLabel")}: ${photo.alt}`}
                      >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        loading={index === 0 ? "eager" : undefined}
                        sizes="(max-width: 780px) 46vw, 22vw"
                      />
                        <span className="gallery-media-hint">{t("gallery.openLabel")}</span>
                      </button>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="gallery-section-card">
            <div className="gallery-section-head">
              <div>
                <h2>{t("gallery.photoTitle")}</h2>
                <p className="section-text">{t("gallery.photoText")}</p>
              </div>
            </div>

            <div className="photo-grid">
              {photoItems.map((photo, index) => (
                <figure key={photo.src} className={`photo-card photo-card--${photo.layout}`}>
                  <button
                    type="button"
                    className="gallery-media-button"
                    onClick={() => openLightbox("photos", index)}
                    aria-label={`${t("gallery.openLabel")}: ${photo.alt}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading={index === 0 ? "eager" : undefined}
                      sizes="(max-width: 780px) 92vw, (max-width: 1100px) 46vw, 30vw"
                    />
                    <span className="gallery-media-hint">{t("gallery.openLabel")}</span>
                  </button>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {videoItems.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="gallery-section-card">
              <div className="gallery-section-head">
                <div>
                  <h2>{t("gallery.videoTitle")}</h2>
                  <p className="section-text">{t("gallery.videoText")}</p>
                </div>
              </div>

              <div className="local-video-grid">
                {videoItems.map((video, index) => (
                  <article key={video.file} className="local-video-card">
                    <button
                      type="button"
                      className="local-video-button"
                      onClick={() => openLightbox("videos", index)}
                      aria-label={`${t("gallery.openLabel")}: ${video.title}`}
                    >
                      <div className="local-video-frame">
                        <video muted playsInline preload="metadata" src={video.src} />
                        <span className="local-video-play" aria-hidden="true">
                          {t("gallery.openLabel")}
                        </span>
                      </div>
                      <div className="local-video-meta">
                        <p>{video.title}</p>
                        <span>{t("gallery.openLabel")}</span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section dark">
        <div className="container">
          <div className="gallery-section-card gallery-section-card--dark">
            <div className="gallery-section-head">
              <div>
                <h2>{t("gallery.reelTitle")}</h2>
                <p className="section-text">{t("gallery.reelText")}</p>
              </div>
            </div>
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
        </div>
      </section>

      {showScrollTop && !activeItem && (
        <button
          type="button"
          className="gallery-scroll-top gallery-lightbox-icon-button"
          onClick={scrollToTop}
          aria-label={t("gallery.scrollTopLabel")}
        >
          <ChevronUpIcon />
          <span className="sr-only">{t("gallery.scrollTopLabel")}</span>
        </button>
      )}

      {activeItem && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={t("gallery.viewerTitle")}>
          <button
            type="button"
            className="gallery-lightbox-backdrop"
            aria-label={t("gallery.closeLabel")}
            onClick={closeLightbox}
          />

          <div className="gallery-lightbox-shell">
            <div className="gallery-lightbox-toolbar">
              <p className="gallery-lightbox-counter">{counterLabel}</p>
              <button
                type="button"
                className="gallery-lightbox-close gallery-lightbox-icon-button"
                onClick={closeLightbox}
                aria-label={t("gallery.closeLabel")}
              >
                <CloseIcon />
                <span className="sr-only">{t("gallery.closeLabel")}</span>
              </button>
            </div>

            <div className="gallery-lightbox-content">
              {activeItems.length > 1 && (
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-icon-button"
                  onClick={() => stepLightbox(-1)}
                  aria-label={t("gallery.prevLabel")}
                >
                  <ChevronLeftIcon />
                  <span className="sr-only">{t("gallery.prevLabel")}</span>
                </button>
              )}

              <div className={`gallery-lightbox-stage gallery-lightbox-stage--${activeItem.mediaType}`}>
                {activeItem.mediaType === "photo" ? (
                  <div className="gallery-lightbox-photo-frame">
                    <Image src={activeItem.src} alt={activeItem.alt} fill loading="eager" sizes="92vw" />
                  </div>
                ) : (
                  <video
                    key={activeItem.src}
                    className="gallery-lightbox-video"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    src={activeItem.src}
                  />
                )}
              </div>

              {activeItems.length > 1 && (
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-icon-button"
                  onClick={() => stepLightbox(1)}
                  aria-label={t("gallery.nextLabel")}
                >
                  <ChevronRightIcon />
                  <span className="sr-only">{t("gallery.nextLabel")}</span>
                </button>
              )}
            </div>

            <p className="gallery-lightbox-caption">{captionLabel}</p>
          </div>
        </div>
      )}
    </div>
  );
}
