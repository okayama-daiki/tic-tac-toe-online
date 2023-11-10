import { useState } from "react";

import Board from "../Board/Board";
import Piece from "../Piece/Piece";
import BackButton from "../BackButton/BackButton";

import { CellState } from "../../common/types";

import * as styles from "./Game.css";

type GameProps = {
  put: (position: [number, number]) => void;
  restart: () => void;
  exit: () => void;
  turn: number;
  board: number[][];
  result: string;
};

export default function Game({
  put,
  restart,
  exit,
  turn,
  board,
  result,
}: GameProps) {
  const [boardAnimation, setBoardAnimation] = useState<boolean>(true);

  return (
    <div className={styles.game}>
      <BackButton onClick={exit} label="exit room" />
      <div className={styles.turnContainer}>
        <div
          className={`${styles.turn} ${turn % 2 == 0 ? styles.activeTurn : ""}`}
        >
          <Piece
            pieceType={CellState.CROSS}
            style={{
              width: "20px",
              height: "20px",
              opacity: turn % 2 == 0 ? 1 : 0.3,
            }}
          />
          <div className={styles.text}>
            {/* {selfState == CellState.CROSS ? "(you)" : "(opp.)"} */}
          </div>
        </div>
        <div
          className={`${styles.turn} ${turn % 2 == 1 ? styles.activeTurn : ""}`}
        >
          <Piece
            pieceType={CellState.NOUGHT}
            style={{
              width: "25px",
              height: "25px",
              opacity: turn % 2 == 1 ? 1 : 0.3,
            }}
          />
          <div className={styles.text}>
            {/* {selfState == CellState.NOUGHT ? "(you)" : "(opp.)"} */}
          </div>
        </div>
      </div>
      <Board board={board} onClick={put} boardAnimation={boardAnimation} />

      <div className={styles.result}>{result}</div>
      <button
        id="restart-button"
        className={styles.button}
        onClick={() => {
          restart();
          setBoardAnimation(false);
          setTimeout(() => {
            setBoardAnimation(true);
          }, 100);
        }}
      >
        <label htmlFor="restart-button" className={styles.label}>
          restart game
        </label>
      </button>
    </div>
  );
}
