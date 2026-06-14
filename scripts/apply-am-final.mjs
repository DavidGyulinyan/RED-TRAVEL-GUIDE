import fs from "fs";

const path = "app/i18n/messages.js";
let src = fs.readFileSync(path, "utf8");

src = src.replaceAll("օ֦֦ֆрo ud", "օ֦րոad");

const oldAmTours = `    tours: {
      title: "Տուր փաթեթներ",
      text: "Ընտրեք պատրաստի երթուղիներից կամ պատվիրեք ամբողջությամբ անհատական լեռնային ճանապarhordordutyun։",
      duration: "Տevoghutyun",
      terrain: "Bardutyun",
      items: [
        { name: "Gagatayin erqush", duration: "1 or", level: "Mijin", details: "Hzor 4x4 erqush lernayin gyowgherov ev bardradir arahetnerov։" },
        { name: "Hrabkhayin lernashtayi arshav", duration: "2 or", level: "Bard", details: "Intensiv offroad arshav hrabkhayin teghanqov` gisherakats tesarzhan vayrerum։" },
        { name: "Antarneri ev gagatneri erqush", duration: "1 or", level: "Tetevits mijin", details: "Yntanekan tesarzhan or` antarayin chanaparhnerov, ditaketerov ev texakan snndov kangarnerov։" },
      ],
    },`;

const newAmTours = `    tours: {
      title: "Տուր փաթեթներ",
      text: "Ընտրեք մեր ստուգված երթուղիներից կամ պատվիրեք ամբողջովին անհատական լեռնային ճանապarhordordutyun։",
      duration: "Տevoghutyun",
      filming: "Nkarahanum",
      picnic: "Piknik",
      overnight: "Gisherakats",
      terrain: "Bardutyun",
      price: "Gin",
      allInclusive: "Patet",
      items: [
        {
          name: "Gagatayin erqush",
          duration: "1 or",
          filming: "Dron",
          picnic: "ust cankutyan",
          level: "Mijin",
          price: "120.000 dram",
          details: "Offroad chanaparhordutyun alpyan margagetinnerov` vayri zhiery, tograber lernazhayqer ev anverj lernain tesaranneri mej`։",
        },
        {
          name: "Erkorya lernain tur",
          duration: "2 or",
          overnight: "Glamping",
          filming: "Dron",
          picnic: "nerarvac e, 2-rd ory",
          level: "Mijin",
          price: "300.000 dram",
          allInclusive: "amboghjovin nerarvac",
          details: "Amboghjakan zhulvel lernnerum` gisherakats glampingum kam harmar lernayin hyowranocnerum` geghcik tesarannerov։",
        },
        {
          name: "Anhatakan turer",
          duration: "1 or",
          level: "Tetevits mijin",
          details: "Anhatakan tur dzer eruthyov։ Chanaparhordveq aynpes, inchpes dzez hamar e։ Lerner, vanker, lcner, jrhvejner, alpyan margagetinner ev Hayastani amenageghcik chanaparhnery։",
        },
      ],
    },`;

if (!src.includes(oldAmTours)) throw new Error("AM tours block not found");
src = src.replace(oldAmTours, newAmTours);

fs.writeFileSync(path, src, "utf8");
console.log("done");
