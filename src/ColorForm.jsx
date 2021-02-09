import React, { useEffect, useState } from "react";
import diff from "color-diff";
import hexToRgb from "./helper/hexToRgb";
import axios from "axios";
import dbtypeToRgb from "./helper/dbtypeToRgb";
import Color3d from "color3d";

export const ColorForm = () => {
  const [colors, setColors] = useState("");
  const [palette, setPalette] = useState([
    { R: 255, G: 0, B: 0 },
    { R: 0, G: 255, B: 0 },
    { R: 0, G: 0, B: 255 },
  ]);

  useEffect(() => {
    async function fetchColors() {
      try {
        const res = await axios.get("/get");
        setColors(res.data);
        setPalette(dbtypeToRgb(res.data));
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchColors();
  }, []);
  const black = [255, 255, 255];
  const [color, setColor] = useState(black);
  const [nearColor, setNearColor] = useState(false);
  useEffect(() => {
    const near = diff.closest(
      { R: color[0], G: color[1], B: color[2] },
      palette
    );
    setNearColor([near.R, near.G, near.B]);
  }, [color]);

  const color3d = new Color3d(
    [
      "#FFF0F6",
      "#FFD6E7",
      "#FFADD2",
      "#FF85C0",
      "#F759AB",
      "#EB2F96",
      "#C41D7F",
      "#9E1068",
      "#780650",
      "#520339",
    ],
    {
      spaceMode: "hsv",
      background: "#000000",
    }
  );
  //console.log(color3d);
  color3d.render(document.getElementById("container"));

  return (
    <main>
      <h1>{`R: ${color[0]} G: ${color[1]} B: ${color[2]}`}</h1>
      <h2>{nearColor}</h2>
      {/* <h3>{`R: ${colors[3].r} G: ${colors[3].g} B: ${colors[3].b}`}</h3> */}
      <input
        type="color"
        onChange={(e) => {
          setColor(hexToRgb(e.target.value));
        }}
      ></input>
      <div id="container">color3d</div>
    </main>
  );
};
