import { useState } from "react";

import Piece from "../Piece/Piece";
import { CellState } from "../../common/types";

import * as styles from "./Board.css";

type BoardProps = {
  board: CellState[][];
  onClick: (position: [number, number]) => void;
  clickable: boolean;
};

export default function Board({ board, onClick, clickable }: BoardProps) {
  const [isShaking, setIsShaking] = useState<boolean>(false);

  return (
    <div className={`${styles.boardContainer} ${isShaking && styles.shake}`}>
      <div className={styles.board}>
        <PhysicalBoard></PhysicalBoard>
        <table className={styles.logicalBoard}>
          <tbody>
            {board.map((row, y) => (
              <tr key={y}>
                {row.map((cell, x) => (
                  <td
                    key={x}
                    className={
                      clickable && cell === CellState.EMPTY
                        ? styles.clickable
                        : ""
                    }
                    onClick={() => {
                      if (clickable && cell === CellState.EMPTY) {
                        onClick([y, x]);
                      } else {
                        setIsShaking(true);
                        setTimeout(() => {
                          setIsShaking(false);
                        }, 500);
                      }
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

const PhysicalBoard = () => {
  return (
    <svg viewBox="6 12 204 212" className={styles.physicalBoard}>
      <path d="M108,83 L6,83" />
      <path d="M108,153 L6,153" />
      <path d="M108,83 L210,83" />
      <path d="M108,153 L210,153" />
      <path d="M73,118 L73,16" />
      <path d="M143,118 L143,16" />
      <path d="M73,118 L73,220" />
      <path d="M143,118 L143,220" />
    </svg>
  );
};
