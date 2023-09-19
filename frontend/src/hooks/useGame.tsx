import { useState } from "react";

import { CellState } from "../common/types";

// type useGameReturnType = [
//   number,
//   CellState[][],
//   GameStatusType,
//   () => void,
//   (pos: [number, number], board: CellState[][]) => void
// ];

type useGameReturnType = [
  number,
  (turn: number) => void,
  CellState[][],
  (board: CellState[][]) => void
];

export default function useGame(): useGameReturnType {
  const [turn, setTurn] = useState<number>(0);
  const [board, setBoard] = useState<CellState[][]>([
    [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
    [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
    [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
  ]);

  // const [gameStatus, setGameStatus] = useState<GameStatusType>(
  //   GameStatusType.ONGOING
  // );

  // const newGame = () => {
  //   setTurn(0);
  //   setBoard([
  //     [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
  //     [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
  //     [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
  //   ]);
  //   setGameStatus(GameStatusType.ONGOING);
  // };

  // const putPiece = ([row, col]: [number, number], board: CellState[][]) => {
  //   const newBoard = board.map((row) => row.slice());
  //   newBoard[row][col] = turn % 2 === 0 ? CellState.CROSS : CellState.NOUGHT;
  //   setBoard(newBoard);
  //   setTurn(turn + 1);

  // Check if the game is over
  // setGameStatus(GameStatusType.FINISHED);
  // };

  return [turn, setTurn, board, setBoard];
}
