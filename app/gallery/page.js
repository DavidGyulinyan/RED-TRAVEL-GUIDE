"use client";

import InstagramReelEmbed, { INSTAGRAM_REEL_SHORTCODES } from "../components/instagram-reel-embed";
import { useI18n } from "../components/i18n-provider";

const photos = [
  "https://phoenixtour.org/wp-content/uploads/2021/04/01-ARMENIAN-NATURE.jpg",
  "https://karavitour.com/wp-content/uploads/2020/04/aragac-kajqi-hamar-1.jpg",
  "https://i.redd.it/nature-of-armenia-is-so-unique-i-dont-get-why-we-arent-as-v0-807jfpxxwwic1.jpg?width=1920&format=pjpg&auto=webp&s=0e2f9790298dfcbf6a54972ba3433e3cf851eb39",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa4eS0j98VWB0Bz5g5K85MbySjPU7qJNVIA&s",
  "https://d31qtdfy11mjj9.cloudfront.net/gallery/1557131666824133567.jpg",
  "https://welcomevoyage.com/wp-content/uploads/2026/03/vodopad-trchkan-samyj-vysokij-vodopad-armenii.webp",
];

export default function GalleryPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <h1>{t("gallery.title")}</h1>
          <p className="section-text">{t("gallery.text")}</p>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <img key={photo} src={photo} alt={`Armenia mountain view ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <h2>{t("gallery.videoTitle")}</h2>
          <div className="video-grid">
            {INSTAGRAM_REEL_SHORTCODES.map((shortcode, index) => (
              <InstagramReelEmbed
                key={shortcode}
                shortcode={shortcode}
                captionTitle={`Trail Reel ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
