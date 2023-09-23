import { CellState } from "../common/types";
import * as styles from "./Piece.css";

type PieceProps = {
  pieceType: CellState;
};

const NOUGHT = (
  <svg viewBox="0 0 128 128" className={styles.piece}>
    <circle cx="64" cy="64" r="48" className={styles.nought}></circle>
  </svg>
);

const CROSS = (
  <svg viewBox="0 0 128 128" className={styles.piece}>
    <path d="M16,16L112,112" className={styles.cross}></path>
    <path d="M112,16L16,112" className={styles.cross}></path>
  </svg>
);

const EMPTY = <svg className={styles.piece}></svg>;

export default function Piece({ pieceType }: PieceProps) {
  const mapping = {
    [CellState.NOUGHT]: NOUGHT,
    [CellState.CROSS]: CROSS,
    [CellState.EMPTY]: EMPTY,
  };
  return mapping[pieceType];
}
