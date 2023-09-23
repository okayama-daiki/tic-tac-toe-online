import Board from "./Board";
import * as styles from "./Game.css";

type GameProps = {
  put: (y: number, x: number) => void;
  turn: number;
  board: number[][];
  finish: () => void;
};

export default function Game({ put, turn, board, finish }: GameProps) {
  return (
    <div className={styles.game}>
      <div className={styles.buttonContainer}>
        <a
          className={styles.button}
          tabIndex={1}
          onClick={finish}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              finish();
            }
          }}
        >
          Back to Title
        </a>
      </div>
      <Board board={board} onClick={put} />
      {/* <div className={styles.currentTurn}>{"XO"[turn % 2]}'s Turn</div> */}
    </div>
  );
}
