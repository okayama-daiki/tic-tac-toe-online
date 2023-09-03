import { PieceType } from "../common/types";
import * as styles from "./Piece.css";

type PieceProps = {
  pieceType: PieceType;
};

export default function Piece({ pieceType }: PieceProps) {
  return (
    <>
      {pieceType === PieceType.NOUGHT && (
        <svg
          aria-label="O"
          role="img"
          viewBox="0 0 128 128"
          className={styles.piece}
          style={{ fill: "transparent" }}
        >
          <path
            d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
            style={{
              stroke: "rgb(84, 84, 84)",
              strokeDasharray: "301.635",
              strokeWidth: "10px",
              strokeDashoffset: "0",
            }}
          ></path>
        </svg>
      )}
      {pieceType === PieceType.CROSS && (
        <svg
          aria-label="X"
          role="img"
          viewBox="0 0 128 128"
          className={styles.piece}
        >
          <path
            d="M16,16L112,112"
            style={{
              stroke: "rgb(84, 84, 84)",
              strokeDasharray: "135.764",
              strokeWidth: "10px",
              strokeDashoffset: "0",
            }}
          ></path>
          <path
            d="M112,16L16,112"
            style={{
              stroke: "rgb(84, 84, 84)",
              strokeDasharray: "135.764",
              strokeWidth: "10px",
              strokeDashoffset: "0",
            }}
          ></path>
        </svg>
      )}
    </>
  );
}
