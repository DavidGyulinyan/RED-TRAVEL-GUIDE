"use client";

import { useI18n } from "../components/i18n-provider";

const tours = [
  {
    name: "Summit Access Track",
    duration: "1 Day",
    level: "Moderate",
    details: "A powerful 4x4 route through mountain villages and high-altitude tracks.",
    image: "https://eurasia.travel/wp-content/uploads/2025/06/2.-Aragats-Mount-Armenia.jpg",
  },
  {
    name: "Volcanic Ridge Expedition",
    duration: "2 Days",
    level: "Challenging",
    details:
      "An intense off-road expedition over black volcanic terrain with overnight camp views.",
    image: "https://www.goingthewholehogg.com/wp-content/uploads/Geghama-Mountains-Trekking-Guide-Header.jpg",
  },
  {
    name: "Forest and Peak Escape",
    duration: "1 Day",
    level: "Easy to Moderate",
    details:
      "A scenic family-friendly day with forest roads, mountain viewpoints, and local food stops.",
    image: "https://spinnakertravel.am/wp-content/uploads/2019/05/dilijan2.jpg",
  },
];

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
                <img src={tour.image} alt={tour.name} />
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
