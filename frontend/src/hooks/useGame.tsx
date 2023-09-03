import { useState } from "react";
import { PieceType, GameStatusType } from "../common/types";

type useGameReturnType = [
  number,
  PieceType[][],
  GameStatusType,
  () => void,
  (pos: [number, number]) => void
];

export default function useGame(): useGameReturnType {
  const [turn, setTurn] = useState<number>(0);
  const [board, setBoard] = useState<PieceType[][]>([
    [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
    [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
    [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
  ]);
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatusType.ONGOING
  );

  const newGame = () => {
    setTurn(0);
    setBoard([
      [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
      [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
      [PieceType.EMPTY, PieceType.EMPTY, PieceType.EMPTY],
    ]);
    setGameStatus(GameStatusType.ONGOING);
  };

  const putPiece = ([row, col]: [number, number]) => {
    const newBoard = board.map((row) => row.slice());
    newBoard[row][col] = turn % 2 === 0 ? PieceType.NOUGHT : PieceType.CROSS;
    setBoard(newBoard);
    setTurn(turn + 1);

    // Check if the game is over
    // setGameStatus(GameStatusType.FINISHED);
  };

  return [turn, board, gameStatus, newGame, putPiece];
}
