"use client";

import Image from "next/image";
import { tourCards } from "../tours-data";
import { useI18n } from "../components/i18n-provider";

const tourMetaFields = ["duration", "overnight", "filming", "picnic", "level", "price", "allInclusive"];

const tourMetaLabels = {
  duration: "tours.duration",
  overnight: "tours.overnight",
  filming: "tours.filming",
  picnic: "tours.picnic",
  level: "tours.terrain",
  price: "tours.price",
  allInclusive: "tours.allInclusive",
};

export default function ToursPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <h1>{t("tours.title")}</h1>
          <p className="section-text">{t("tours.text")}</p>
          <div className="card-grid">
            {tourCards.map((tour, index) => (
              <article key={tour.id} className="tour-card">
                <div className="tour-card-media">
                  <Image
                    src={tour.image}
                    alt={tour.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 780px) 92vw, 33vw"
                    className="tour-card-image"
                  />
                </div>
                <div className="tour-card-body">
                  <h3>{t(`tours.items.${index}.name`)}</h3>
                  <p className="tour-card-details">{t(`tours.items.${index}.details`)}</p>
                  <dl className="tour-meta">
                    {tourMetaFields.map((field) => {
                      const value = t(`tours.items.${index}.${field}`);
                      if (!value || value === `tours.items.${index}.${field}`) return null;

                      return (
                        <div key={field} className="tour-meta-row">
                          <dt>{t(tourMetaLabels[field])}</dt>
                          <dd>{value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
