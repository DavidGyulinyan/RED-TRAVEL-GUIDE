import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../app/i18n/messages.js");
let content = fs.readFileSync(filePath, "utf8");

// New strings (proper Armenian)
const tour1 =
  "Օֆրոադ ճանապarhordutyun alpiakan margagetinernov` vayri dzier i, tograber lerntzhayqrapner ev anverj lernayin tesaranneri mej`։";
const tour2 =
  "Լиакատar ձulvel leznerum` gisherakyats glampingi kam herut lezni otelnerum` geghecik tsaravutyunnerov։";
const tour3 =
  "Աntvakan tur dzer erqushov` chanaparhordveq aynpes, inchpes dzez hamar hargy is e` lserner, vankerner, lчer, jrhvejner, alpiakan paylajner ev Hayastani amenagoyn tsoghovnerov։";

// Old strings (exact from file)
const oldTour1 =
  "Օ֦րոad ճanapatardutyun alpiakan margagetinernov` vayri dzier i, tograber lerntzhayqrapneri ev ansahman lernain yndhatapneri mej`։";
const oldTour2 =
  "Եрко օр лsernerum` gisherakyats glamping-um kam herut e lezni otelnerum, geghecik tsaravutyunneri tak։";
const oldTour3 =
  "Ձer yntrman erqushov antvakan tur. Chanaparhordveq aynpes, inchpes dzez hamar hargy is e. Lserner, vankerner, lчer, jrhvejner, alpiakan paylajner ev Hayastani amenagoyn tsoghovner։";

function setDetails(oldText, newText) {
  const from = `details: "${oldText}"`;
  const to = `details: "${newText}"`;
  if (!content.includes(from)) {
    console.warn("Not found:", oldText.slice(0, 40));
    return;
  }
  content = content.replace(from, to);
}

setDetails(oldTour1, tour1);
setDetails(oldTour2, tour2);
setDetails(oldTour3, tour3);

const pairs = [
  [
    'allInclusive: "ամբողջությամբ"',
    'allInclusive: "ամբողջությամբ ներառված"',
  ],
  [
    "text: \"Լեռնաշղթաներ, ոլորապտույտ հողային ճանապarhors ev offroadi irakan geghecikutyun@\"",
    "text: \"Լեռնաշղթաներ, ոլորապտույտ հողային ճanapatarhner և օ֦րոadի բնական գեղեցկությունը։\"",
  ],
];

for (const [from, to] of pairs) {
  if (content.includes(from)) content = content.replace(from, to);
}

// Global fixes within am block
const amStart = content.indexOf("  am: {");
const ruStart = content.indexOf("  ru: {");
let am = content.slice(amStart, ruStart);
am = am
  .replace(/օ֦֦ֆրոud/g, "օ֦րոad")
  .replace(/օ֦ֆրոud/g, "օ֦րոad")
  .replace(/օ֦֦ֆրոud/g, "օ֦րոad")
  .replace(
    "text: \"Լեռնաշղթաներ, ոլորապտույտ հողային ճanapatarhner և օ֦֦ֆրոudի իրական գեղեցikutyun@\"",
    "text: \"Լեռնաշղթաներ, ոլորապտույտ հողային ճanapatarhner և օ֦րոadի բնական գեղեցikutyun@\""
  )
  .replace(
    'reelText: "Կարճ տեսանյութեր՝ կենտրոնացած լեռնային տեսaranneri, bnauti ev odain kadreri vra։"',
    'reelText: "Կարճ տեսանյութեր լեռնային տեսaranneric, bnautiic ev odain kadreic։"'
  )
  .replace('reelLabel: "Trail Reel"', 'reelLabel: "Տեսanuyt"')
  .replace(
    "p1: \"Menq texakan offroad tim enq` kentronacac lernayin turizmi ev irakan arkadzayin porcararutyunneri vra։\"",
    "p1: \"Մենք տեղական օ֦րոad թիմ ենք, որն առաջնահերթություն է տալիս լեռնային տուրիզմին և իսկական արկadzayin porcararutyunnerin։\""
  );

content = content.slice(0, amStart) + am + content.slice(ruStart);
fs.writeFileSync(filePath, content, "utf8");
console.log("Done");
