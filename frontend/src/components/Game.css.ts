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

export const buttonContainer = style({
  width: "200px",
  marginBottom: "1rem",
});

export const button = style({
  color: "white",
  textDecoration: "underline",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      outline: "1px solid white",
      borderRadius: "2px",
    },
  },
});

export const result = style({
  height: "20px",
  color: "white",
  marginTop: "1rem",
});
