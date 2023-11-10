import { style } from "@vanilla-extract/css";

export const buttonContainer = style({
  width: "230px",
  margin: "10px 0",
});

export const button = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "whitesmoke",
  opacity: "0.6",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  background: "none",
  border: "none",
  selectors: {
    "&:focus": {
      outline: "none",
      borderRadius: "2px",
    },
    "&:hover": {
      opacity: "1",
    },
  },
});

export const arrow = style({
  height: "20px",
  width: "20px",
  marginRight: "2px",
});

export const label = style({
  cursor: "pointer",
});
