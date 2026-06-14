import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = fs.readFileSync(path.join(__dirname, "../app/i18n/messages.js"), "utf8").split(/\r?\n/);
const tour1 = lines[178];
const start = tour1.indexOf("details: \"") + 10;
const end = tour1.lastIndexOf("\",");
console.log(JSON.stringify(tour1.slice(start, end)));
