import { useState } from "react";

import Board from "../Board/Board";
import BackButton from "../BackButton/BackButton";

import * as styles from "./Game.css";

type GameProps = {
  put: (position: [number, number]) => void;
  restart: () => void;
  exit: () => void;
  turn: boolean;
  board: number[][];
};

export default function Game({ put, restart, exit, turn, board }: GameProps) {
  const [boardAnimation, setBoardAnimation] = useState<boolean>(true);

  const Message = ({ text, useDot }: { text: string; useDot?: boolean }) => {
    return (
      <p className={styles.message}>
        {text}
        {useDot && (
          <>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </>
        )}
      </p>
    );
  };

  return (
    <div className={styles.game}>
      <BackButton onClick={exit} label="exit room" />
      <div className={styles.messageContainer}>
        <Message text={turn ? "Your turn" : "Waiting"} useDot={!turn} />
      </div>
      <div className={styles.boardContainer}>
        <Board board={board} onClick={put} boardAnimation={boardAnimation} />
      </div>

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
