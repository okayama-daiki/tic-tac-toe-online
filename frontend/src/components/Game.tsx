import useGame from "../hooks/useGame";
import Board from "./Board";
import { GameStatusType } from "../common/types";
import * as styles from "./Game.css";

export default function Game() {
  const [turn, board, gameStatus, newGame, putPiece] = useGame();
  return (
    <div className={styles.game}>
      <div>{`turn: ${turn % 2 === 0 ? "NOUGHT" : "CROSS"}`}</div>
      <Board board={board} onClick={putPiece} />
      {gameStatus === GameStatusType.FINISHED && (
        <div onClick={newGame}>NEW GAME</div>
      )}
    </div>
  );
}
