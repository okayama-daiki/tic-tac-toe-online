import Board from "./Board";
import * as styles from "./Game.css";

type GameProps = {
  put: (y: number, x: number) => void;
  turn: number;
  board: number[][];
};

export default function Game({ put, turn, board }: GameProps) {
  return (
    <div className={styles.game}>
      <div>{`turn: ${turn % 2 === 0 ? "CROSS" : "NOUGHT"}`}</div>
      <Board board={board} onClick={put} />
    </div>
  );
}
