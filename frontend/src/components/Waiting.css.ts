// Reference: Paolo Duzioni April 3, 2017 (https://codepen.io/Paolo-Duzioni/pen/OpqbOr)

import { style, keyframes } from "@vanilla-extract/css";

const waves = keyframes({
  "0%": {
    transform: "translateX(0)",
    opacity: 0,
  },
  "4%": {
    transform: "translateY(-25px)",
    opacity: 1,
  },
  "8%": {
    transform: "translateY(0)",
    opacity: 1,
  },
  "70%": {
    opacity: 0,
  },
});

export const waiting = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#282c34",
  color: "white",
});

export const buttonContainer = style({
  width: "230px",
});

export const button = style({
  textDecoration: "underline",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      outline: "1px solid white",
      borderRadius: "2px",
    },
  },
});

export const board = style({
  display: "flex",
  marginTop: "4rem",
  justifyContent: "center",
});

export const face = style({
  display: "flex",
  width: "3rem",
  height: "3rem",
  margin: "0 .7rem",
  padding: ".5rem",
  borderRadius: "5px",
  opacity: "0",
  background: "white",
  selectors: {
    "&:nth-child(1)": {
      animation: `${waves} 5s .0s linear infinite`,
    },
    "&:nth-child(2)": {
      animation: `${waves} 5s .2s linear infinite`,
    },
    "&:nth-child(3)": {
      animation: `${waves} 5s .4s linear infinite`,
    },
  },
});

export const dot = style({
  width: ".8rem",
  height: ".8rem",
  backgroundColor: "#F44336",
  borderRadius: "50%",
});

export const firstFace = style({
  justifyContent: "center",
  alignItems: "center",
});

export const message = style({
  marginTop: "1rem",
  textAlign: "center",
});
