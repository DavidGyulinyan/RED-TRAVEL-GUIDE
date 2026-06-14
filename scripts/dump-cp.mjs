import fs from "fs";

const line = fs.readFileSync("app/i18n/messages.js", "utf8").split(/\r?\n/)[203];
const s = line.match(/"(.+)"/)[1];
console.log(s);
console.log([...s].slice(0, 40).map((c) => c.codePointAt(0).toString(16)).join(" "));

const expected =
  "\u0531\u0575\u057d \u057a\u0561\u057f\u056f\u0565\u0580\u0561\u057d\u0580\u0561\u0570\u0568 \u0574\u056b\u0561\u0575\u0576 \u057f\u0565\u057d\u0561\u0580\u0561\u0576\u0576\u0565\u0580\u056b \u0574\u0561\u057d\u056b\u0576 \u0579\u0567\u0589";
console.log("match start", s.startsWith(expected.slice(0, 20)));
