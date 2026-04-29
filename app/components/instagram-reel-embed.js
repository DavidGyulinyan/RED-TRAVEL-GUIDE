"use client";

/** Shortcodes from instagram.com/reel/{shortcode}/ — order is display order */
export const INSTAGRAM_REEL_SHORTCODES = [
  "DXpC15aDHgs",
  "DW4vUhcjEJ8",
  "DWvstRVjAp6",
  "DXtYEFOjHF5",
  "DXoq0X4DPXa",
];

export default function InstagramReelEmbed({ shortcode, captionTitle = "Instagram reel" }) {
  const embedSrc = `https://www.instagram.com/reel/${encodeURIComponent(shortcode)}/embed/`;

  return (
    <article className="reel-card reel-card--embed">
      <div className="reel-embed-frame">
        <iframe
          src={embedSrc}
          title={`Instagram reel ${shortcode}`}
          allow="encrypted-media; autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="reel-meta">
        <p>{captionTitle}</p>
        <span>@hayko_red_travel_guide</span>
      </div>
    </article>
  );
}
