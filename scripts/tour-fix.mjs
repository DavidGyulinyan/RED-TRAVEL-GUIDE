import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../app/i18n/messages.js");
const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

lines[189] =
  '          details: "Լիակատar ձulvel leznerum` gisherakyats glampingi kam herut lezni otelnerum` geghecik tsaravutyunnerov։",';

lines[195] =
  '          details: "Աntvakan tur dzer erqushov` chanaparhordveq aynpes, inchpes dzez hamar hargy is e` lserner, vankerner, lчer, jrhvejner, alpiakan paylajner ev Hayastani amenagoyn tsoghovnerov։",';

fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("tours 2 and 3 fixed");
