import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../app/i18n/messages.js");
const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

const getDetail = (idx) => {
  const line = lines[idx];
  const start = line.indexOf("details: \"") + 10;
  const end = line.lastIndexOf("\",");
  return line.slice(start, end);
};

lines[178] = `          details: "${getDetail(178).replace("leznsrapneri", "leznsrapner").replace("ansahman", "ansahman")}",`;

fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("tour 1 fixed");
