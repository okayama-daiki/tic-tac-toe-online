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
  height: "100dvh",
  backgroundColor: "#282c34",
  color: "white",
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

export const line1 = style({
  position: "absolute",
  top: "35%",
  left: "10%",
  height: "1px",
  width: "80%",
  backgroundColor: "black",
});

export const line2 = style({
  position: "absolute",
  top: "65%",
  left: "10%",
  height: "1px",
  width: "80%",
  backgroundColor: "black",
});

export const line3 = style({
  position: "absolute",
  top: "10%",
  left: "35%",
  height: "80%",
  width: "1px",
  backgroundColor: "black",
});

export const line4 = style({
  position: "absolute",
  top: "10%",
  left: "65%",
  height: "80%",
  width: "1px",
  backgroundColor: "black",
});

export const cross = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "30%",
  width: "30%",
  transform: "translate(-50%, -50%)",
  selectors: {
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "1px",
      width: "80%",
      backgroundColor: "black",
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "1px",
      width: "80%",
      backgroundColor: "black",
      transform: "translate(-50%, -50%) rotate(-45deg)",
    },
  },
});

export const cross2 = style({
  position: "absolute",
  top: "80%",
  left: "50%",
  height: "30%",
  width: "30%",
  transform: "translate(-50%, -50%)",
  selectors: {
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "1px",
      width: "80%",
      backgroundColor: "black",
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "1px",
      width: "80%",
      backgroundColor: "black",
      transform: "translate(-50%, -50%) rotate(-45deg)",
    },
  },
});

export const nought = style({
  position: "absolute",
  top: "80%",
  left: "80%",
  height: "15%",
  width: "15%",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  border: "1px solid black",
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

export const secondFace = style({
  justifyContent: "center",
  alignItems: "center",
});

export const thirdFace = style({
  justifyContent: "center",
  alignItems: "center",
});

export const message = style({
  marginTop: "1rem",
  textAlign: "center",
});

export const roomNo = style({});
