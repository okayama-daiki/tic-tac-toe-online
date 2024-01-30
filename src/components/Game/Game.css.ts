import { style, keyframes } from "@vanilla-extract/css";

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const hop = keyframes({
  "0%": {
    transform: "translateY(0)",
  },
  "10%": {
    transform: "translateY(-5px)",
  },
  "25%": {
    transform: "translateY(0)",
  },
});

export const game = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#282c34",
  width: "100vw",
  height: "100dvh",
});

export const messageContainer = style({
  width: "200px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "2rem 0 5px",
});

export const message = style({
  width: "100%",
  margin: "0",
  textAlign: "center",
  color: "rgba(245, 245, 245, 0.85)",
  opacity: "0",
  animation: `${fadeIn} 0.25s 0.5s forwards`,
});

export const dot = style({
  display: "inline-block",
  selectors: {
    "&:nth-child(1)": {
      animation: `${hop} 3s .2s ease-in infinite`,
    },
    "&:nth-child(2)": {
      animation: `${hop} 3s .6s ease-in infinite`,
    },
    "&:nth-child(3)": {
      animation: `${hop} 3s 1s ease-in-out infinite`,
    },
  },
});

export const boardContainer = style({
  margin: "10px 0 20px",
});

export const button = style({
  color: "whitesmoke",
  opacity: "0.6",
  backgroundColor: "transparent",
  transition: "all 0.2s ease-in-out",
  border: "none",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      opacity: "1",
    },
  },
});

export const label = style({
  letterSpacing: "0.5px",
  cursor: "pointer",
});
