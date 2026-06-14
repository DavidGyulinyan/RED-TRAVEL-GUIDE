import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = fs.readFileSync(path.join(__dirname, "../app/i18n/messages.js"), "utf8").split(/\r?\n/);
const getDetail = (idx) => {
  const line = lines[idx];
  const start = line.indexOf("details: \"") + 10;
  const end = line.lastIndexOf("\",");
  return line.slice(start, end);
};

const t1 = getDetail(178);
console.log("bad part:", JSON.stringify(t1.slice(t1.indexOf(","))));
