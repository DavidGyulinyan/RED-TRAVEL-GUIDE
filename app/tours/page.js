"use client";

import Image from "next/image";
import { galleryPhotos } from "../gallery-photos";
import { useI18n } from "../components/i18n-provider";

const tourPhotoBySrc = new Map(galleryPhotos.map((photo) => [photo.src, photo]));

function getTourPhoto(name, duration, level, details, src) {
  const photo = tourPhotoBySrc.get(src);
  if (!photo) return null;

  return {
    name,
    duration,
    level,
    details,
    image: photo.src,
    alt: photo.alt,
  };
}

const tours = [
  getTourPhoto(
    "Summit Access Track",
    "1 Day",
    "Moderate",
    "A powerful 4x4 route through mountain villages and high-altitude tracks.",
    "/gallery/offroad-10.png"
  ),
  getTourPhoto(
    "Volcanic Ridge Expedition",
    "2 Days",
    "Challenging",
    "An intense off-road expedition over black volcanic terrain with overnight camp views.",
    "/gallery/offroad-04.png"
  ),
  getTourPhoto(
    "Forest and Peak Escape",
    "1 Day",
    "Easy to Moderate",
    "A scenic family-friendly day with forest roads, mountain viewpoints, and local food stops.",
    "/gallery/offroad-13.png"
  ),
].filter(Boolean);

export default function ToursPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <h1>{t("tours.title")}</h1>
          <p className="section-text">{t("tours.text")}</p>
          <div className="card-grid">
            {tours.map((tour, index) => (
              <article key={tour.name} className="tour-card">
                <Image
                  src={tour.image}
                  alt={tour.alt}
                  width={720}
                  height={440}
                  sizes="(max-width: 780px) 92vw, 33vw"
                />
                <div className="tour-card-body">
                  <h3>{t(`tours.items.${index}.name`)}</h3>
                  <p>{t(`tours.items.${index}.details`)}</p>
                  <p>
                    <strong>{t("tours.duration")}:</strong> {t(`tours.items.${index}.duration`)}
                  </p>
                  <p>
                    <strong>{t("tours.terrain")}:</strong> {t(`tours.items.${index}.level`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
