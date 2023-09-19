import { style } from "@vanilla-extract/css";

export const waiting = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(200px, 50%, 500px)",
  height: "clamp(200px, 50%, 500px)",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const text = style({
  color: "white",
  fontSize: "clamp(1rem, 5vw, 2rem)",
  textAlign: "center",
  margin: "1rem",
  fontWeight: "bold",
  textShadow: "0 0 10px black",
});
