import { useState } from "react";

import { CellState } from "../common/types";

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

  return [turn, setTurn, board, setBoard];
}
