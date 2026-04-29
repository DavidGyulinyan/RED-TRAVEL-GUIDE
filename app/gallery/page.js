"use client";

import { useI18n } from "../components/i18n-provider";

const photos = [
  "https://phoenixtour.org/wp-content/uploads/2021/04/01-ARMENIAN-NATURE.jpg",
  "https://karavitour.com/wp-content/uploads/2020/04/aragac-kajqi-hamar-1.jpg",
  "https://i.redd.it/nature-of-armenia-is-so-unique-i-dont-get-why-we-arent-as-v0-807jfpxxwwic1.jpg?width=1920&format=pjpg&auto=webp&s=0e2f9790298dfcbf6a54972ba3433e3cf851eb39",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGa4eS0j98VWB0Bz5g5K85MbySjPU7qJNVIA&s",
  "https://d31qtdfy11mjj9.cloudfront.net/gallery/1557131666824133567.jpg",
  "https://welcomevoyage.com/wp-content/uploads/2026/03/vodopad-trchkan-samyj-vysokij-vodopad-armenii.webp",
];

const clips = [
  "https://player.vimeo.com/external/371433846.sd.mp4?s=a4b6988b63fa70eb89ecf593bcd855287983afcb&profile_id=139&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/477695699.sd.mp4?s=f3f38c52ef506f88ea4f7dd6f6dfd5ccfdb892ce&profile_id=139&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/397693004.sd.mp4?s=74050dbdeeff4b9f8f778d13f70906f25a5c13e3&profile_id=139&oauth2_token_id=57447761",
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
            {clips.map((clip, index) => (
              <video key={clip} controls muted loop playsInline>
                <source src={clip} type="video/mp4" />
                Off-road video {index + 1}
              </video>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
