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

export const turnContainer = style({
  width: "200px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "1rem",
});

export const turn = style({
  width: "45%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "2px solid rgba(245, 245, 245, 0.3)",
  borderRadius: "3%",
  color: "rgba(245, 245, 245, 0.3)",
  transition: "all 0.5s ease-in-out",
});

export const activeTurn = style({
  borderBottom: "2px solid rgba(245, 245, 245, 1)",
  color: "rgba(245, 245, 245, 1)",
});

export const text = style({
  fontSize: "1rem",
});
