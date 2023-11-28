import { style, keyframes, globalStyle } from "@vanilla-extract/css";

const lineDraw = keyframes({
  "0%": {
    strokeDashoffset: "102",
  },
  "100%": {
    strokeDashoffset: "0",
  },
});

const shakeAnimation = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "25%": {
    transform: "translateX(-5px) rotate(5deg)",
  },
  "50%": {
    transform: "translateX(5px) rotate(-5deg)",
  },
  "75%": {
    transform: "translateX(-5px) rotate(5deg)",
  },
  "100%": {
    transform: "translateX(0)",
  },
});

export const shake = style({
  animation: `${shakeAnimation} 0.5s`,
});

export const clickable = style({
  cursor: "pointer",
});

export const boardContainer = style({
  width: "200px",
  height: "200px",
});

export const board = style({
  position: "relative",
});

export const physicalBoard = style({
  position: "absolute",
  width: "200px",
  height: "200px",
  top: "0",
  left: "0",
  zIndex: "1",
});

globalStyle(`${physicalBoard} > path`, {
  stroke: "whitesmoke",
  opacity: "0.6",
  strokeWidth: "3px",
  strokeDasharray: "102",
  strokeDashoffset: "0",
  animation: `${lineDraw} 0.5s ease-in-out`,
});

export const logicalBoard = style({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "2",
});
