import fs from "fs";

const lines = fs.readFileSync("app/i18n/messages.js", "utf8").split(/\r?\n/);
for (const i of [148, 178, 189, 195]) {
  const line = lines[i];
  const m = line.match(/details: "(.+)"|title: "(.+)"/);
  const s = m?.[1] || m?.[2] || line;
  console.log("\n--- line", i + 1, "---");
  console.log(s);
}
