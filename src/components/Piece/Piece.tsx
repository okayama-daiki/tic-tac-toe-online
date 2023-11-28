import { CellState } from "../../common/types";
import * as styles from "./Piece.css";

type PieceProps = {
  pieceType: CellState;
};

export default function Piece({ pieceType }: PieceProps) {
  switch (pieceType) {
    case CellState.NOUGHT:
      return (
        <svg viewBox="0 0 128 128" className={styles.piece}>
          <circle cx="64" cy="64" r="48" className={styles.nought}></circle>
        </svg>
      );

    case CellState.CROSS:
      return (
        <svg viewBox="0 0 128 128" className={styles.piece}>
          <path d="M16,16L112,112" className={styles.cross}></path>
          <path d="M112,16L16,112" className={styles.cross}></path>
        </svg>
      );

    case CellState.EMPTY:
      return <svg className={styles.piece}></svg>;
  }
}
