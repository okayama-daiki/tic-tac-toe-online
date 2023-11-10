// Copyright: Soufiane Khalfaoui HaSsani April 8, 2020 (https://codepen.io/soufiane-khalfaoui-hassani/pen/LYpPWda)

import { style, globalStyle, keyframes } from "@vanilla-extract/css";

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

export const lobby = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#282c34",
  color: "white",
});

export const box = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "300px",
});

export const gameTitle = style({
  fontSize: "2rem",
  marginBottom: "3rem",
  textAlign: "center",
});

export const inputBox = style({
  position: "relative",
  width: "80%",
});

export const input = style({
  width: "100%",
  padding: "10px 0",
  fontSize: "16px",
  color: "white",
  marginBottom: "3px",
  border: "none",
  borderBottom: "1px solid white",
  outline: "none",
  background: "transparent",
});

export const label = style({
  position: "absolute",
  top: "0",
  left: "0",
  padding: "10px 0",
  fontSize: "16px",
  color: "rgba(255, 255, 255, 0.5)",
  letterSpacing: ".75px",
  pointerEvents: "none",
  transition: "0.5s",
});

export const focusLabel = globalStyle(`${input}:focus ~ ${label}`, {
  top: "-20px",
  left: "0",
  fontSize: "14px",
  color: "white",
});

export const validLabel = globalStyle(`${input}:valid ~ ${label}`, {
  top: "-20px",
  left: "0",
  fontSize: "14px",
  color: "white",
});

export const errorMessage = style({
  marginTop: "2px",
  height: "10px",
  fontSize: "0.9rem",
  color: "red",
});

export const shake = style({
  animation: `${shakeAnimation} 0.5s`,
});

export const button = style({
  position: "relative",
  display: "inline-block",
  padding: "12px 24px",
  color: "white",
  textDecoration: "none",
  textTransform: "uppercase",
  overflow: "hidden",
  transition: "0.5s",
  marginTop: "1rem",
  letterSpacing: "2px",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: "white",
      color: "#282c34",
      borderRadius: "5px",
      boxShadow: "0 0 3px white, 0 0 5px white",
    },
    "&:focus": {
      outline: "1px solid white",
      borderRadius: "5px",
      transition: "none",
    },
  },
});
