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
  () => void,
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

  const nextTurn = () => {
    setTurn((turn) => turn + 1);
  };

  return [turn, nextTurn, board, setBoard];
}
