import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../app/i18n/messages.js");
const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

const OFF = "\u0555\u0566\u0580\u0578\u0561\u0564";

// Fix lakes: լճեր not լփեր
lines[195] = lines[195].replace("\u056c\u0583\u0565\u0580", "\u056c\u0573\u0565\u0580");

// Natural about p1
lines[224] = `      p1: "\u0544\u0565\u0576\u0584 \u057f\u0565\u0562\u0561\u056f\u0561\u0576 ${OFF} \u0569\u056b\u0574 \u0565\u0576\u0584 \u0587 \u0561\u0577\u0561\u057f\u0578\u0582\u0574 \u0565\u0576\u0584 \u056c\u0565\u0580\u0576\u0561\u0575\u056b\u0576 \u057f\u0578\u0582\u0580\u056b\u0566\u0574\u056b\u0576 \u0587 \u056b\u057d\u056f\u0561\u0576 \u0561\u0580\u056f\u0561\u0564\u0561\u0575\u056b\u0576 \u0561\u0580\u056f\u0561\u0564\u0576\u0565\u0580\u0568\u0589",`;

// ctaGallery matches EN intent
lines[150] = '      ctaGallery: "\u0534\u056b\u057f\u0565\u056c \u0578\u0582\u0563\u0565\u0576\u0561\u056c\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568",';

fs.writeFileSync(filePath, lines.join("\n"), "utf8");

// Scan am block for Latin letters
const amStart = lines.findIndex((l) => l.trim() === "am: {");
const ruStart = lines.findIndex((l) => l.trim() === "ru: {");
const amText = lines.slice(amStart, ruStart).join("\n");
const latin = amText.match(/[A-Za-z]{3,}/g) || [];
const allowed = new Set(["WhatsApp", "Instagram", "Red", "Travel", "Guide", "Reels", "Trail", "Reel"]);
const bad = [...new Set(latin)].filter((w) => !allowed.has(w) && !/^4x4$/.test(w));
console.log("Latin leftovers:", bad.length ? bad : "none");
console.log(lines[195].match(/"(.+)"/)[1]);
