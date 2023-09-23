import { style, keyframes } from "@vanilla-extract/css";

const lineDraw = keyframes({
  "0%": {
    strokeDashoffset: "102",
  },
  "100%": {
    strokeDashoffset: "0",
  },
});

export const boardContainer = style({
  width: "200px",
  height: "200px",
});

export const board = style({
  position: "relative",
});

export const cell = style({});

export const boardView = style({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "1",
});

export const line = style({
  stroke: "whitesmoke",
  opacity: "0.6",
  strokeWidth: "3px",
  strokeDasharray: "102",
  strokeDashoffset: "0",
  animation: `${lineDraw} 0.5s ease-in-out`,
});

export const boardClickable = style({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "2",
});
