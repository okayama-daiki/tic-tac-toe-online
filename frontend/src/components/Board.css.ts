import { style, keyframes } from "@vanilla-extract/css";

const cellSize = "clamp(50px, 4vw, 70px)";

export const board = style({
  display: "grid",
  width: `calc(${cellSize} * 3 + 10px)`,
  height: `calc(${cellSize} * 3 + 10px)`,
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
});

const borderAnimation = keyframes({
  "0%": { border: "0px solid black" },
  "50%": { border: "0.5px solid black" },
  "100%": { border: "1px solid black" },
});

export const cell = style({
  width: cellSize,
  height: cellSize,
  textAlign: "center",
  animation: `${borderAnimation} 2s forwards`,
});
