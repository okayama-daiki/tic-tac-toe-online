import Piece from "./Piece";
import { CellState } from "../common/types";
import * as styles from "./Board.css";

type BoardProps = {
  board: CellState[][];
  onClick: (y: number, x: number) => void;
};

export default function Board({ board, onClick }: BoardProps) {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        <svg
          viewBox="6 12 204 212"
          width="200px"
          height="200px"
          className={styles.boardView}
        >
          <path d="M108,83 L6,83" className={styles.line}></path>
          <path d="M108,153 L6,153" className={styles.line}></path>
          <path d="M108,83 L210,83" className={styles.line}></path>
          <path d="M108,153 L210,153" className={styles.line}></path>
          <path d="M73,118 L73,16" className={styles.line}></path>
          <path d="M143,118 L143,16" className={styles.line}></path>
          <path d="M73,118 L73,220" className={styles.line}></path>
          <path d="M143,118 L143,220" className={styles.line}></path>
        </svg>
        <table className={styles.boardClickable}>
          <tbody>
            {board.map((row, y) => (
              <tr key={y}>
                {row.map((cell, x) => (
                  <td
                    key={x}
                    onClick={() => {
                      onClick(y, x);
                    }}
                  >
                    <Piece pieceType={cell}></Piece>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
