import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { messages } = require("../app/i18n/messages.js");

function walk(obj, path = "") {
  if (typeof obj === "string") return [[path, obj]];
  if (Array.isArray(obj)) return obj.flatMap((v, i) => walk(v, `${path}[${i}]`));
  return Object.entries(obj).flatMap(([k, v]) => walk(v, path ? `${path}.${k}` : k));
}

const am = messages.am;
const latin = [];
for (const [p, s] of walk(am)) {
  const m = s.match(/[A-Za-z]{4,}/g);
  if (m) {
    const ok = m.every((w) =>
      ["WhatsApp", "Instagram", "Red", "Travel", "Guide", "Reels", "Trail", "Reel"].includes(w)
    );
    if (!ok) latin.push({ p, s, m });
  }
}

console.log("Latin issues:", latin.length ? latin : "none");
console.log("\nTour 1:", am.tours.items[0].details);
console.log("Tour 2:", am.tours.items[1].details);
console.log("Tour 3:", am.tours.items[2].details);
console.log("\nAbout p1:", am.about.p1);
console.log("Gallery:", am.gallery.experienceText.slice(0, 60) + "...");
