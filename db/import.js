const fs = require("fs");
const db = require("../server/knex.js");

const seedColors = async () => {
  try {
    // run at server directory!
    const colors = JSON.parse(fs.readFileSync("../db/color-list.json"));
    for (const color of colors) {
      console.log(color);
      //const id = color.colorId;
      const name = color.name;
      const r = color.rgb.r;
      const g = color.rgb.g;
      const b = color.rgb.b;
      const hex = color.hexString;
      db.select().table("colors");
      await db("colors").insert({
        //id: id,
        name: name,
        r: r,
        g: g,
        b: b,
        hex: hex,
      });
      console.log("END");
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

module.exports = seedColors;
