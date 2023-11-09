import { style, keyframes } from "@vanilla-extract/css";

export const drawNought = keyframes({
  "0%": {
    strokeDashoffset: "300",
  },
  "100%": {
    strokeDashoffset: "0",
  },
});

export const drawCross = keyframes({
  "0%": {
    strokeDashoffset: "102",
  },
  "100%": {
    strokeDashoffset: "0",
  },
});

export const piece = style({
  width: "50px",
  height: "50px",
  margin: "5px 6px",
});

export const nought = style({
  stroke: "#5bb450",
  strokeDasharray: "301.635",
  strokeWidth: "10px",
  strokeDashoffset: "0",
  fill: "transparent",
  animation: `${drawNought} 0.3s ease-in-out`,
});

export const cross = style({
  stroke: "#fe5c5c",
  strokeDasharray: "135.764",
  strokeWidth: "10px",
  strokeDashoffset: "0",
  animation: `${drawCross} 0.3s ease-in-out`,
});
