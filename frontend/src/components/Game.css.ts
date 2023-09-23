import { style } from "@vanilla-extract/css";

export const game = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#282c34",
  width: "100vw",
  height: "100vh",
});

export const currentTurn = style({
  color: "white",
  marginBottom: "1rem",
});
