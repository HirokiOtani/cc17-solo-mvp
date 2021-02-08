import React, { useEffect, useState } from "react";
import diff from "color-diff";
import hexToRgb from "./helper/hexToRgb";
const colorList = require("./color-list.json");

export const ColorForm = () => {
  const black = [255, 255, 255];
  const [color, setColor] = useState(black);
  const [nearColor, setNearColor] = useState(false);
  const palette = [
    { R: 255, G: 0, B: 0 },
    { R: 0, G: 255, B: 0 },
    { R: 0, G: 0, B: 255 },
  ];
  useEffect(() => {
    const near = diff.closest(
      { R: color[0], G: color[1], B: color[2] },
      palette
    );
    setNearColor([near.R, near.G, near.B]);
  }, [color]);

  return (
    <main>
      <h1>{`R: ${color[0]} G: ${color[1]} B: ${color[2]}`}</h1>
      <h2>{nearColor}</h2>
      <input
        type="color"
        onChange={(e) => {
          setColor(hexToRgb(e.target.value));
        }}
      ></input>
    </main>
  );
};
