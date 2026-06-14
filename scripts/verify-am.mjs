import fs from "fs";

const lines = fs.readFileSync("app/i18n/messages.js", "utf8").split(/\r?\n/);
for (const i of [161, 178, 189, 196, 201, 203, 224]) {
  const line = lines[i];
  const m = line.match(/: "(.+)"[,}]?$/);
  console.log(i + 1, m?.[1] ?? line.slice(0, 80));
}
