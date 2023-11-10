export enum CellState {
  "EMPTY" = -1,
  "CROSS" = 0,
  "NOUGHT" = 1,
}

export enum ClientStatus {
  SEARCHING,
  WAITING,
  PLAYING,
}

export type QueryType = {
  create: (room: string) => void;
  join: (room: string) => void;
  leave: () => void;
  put: (position: [number, number]) => void;
  restart: () => void;
  exit: () => void;
};

export type GameStatus = {
  elapsedTurn: number;
  currentTurn: number;
  board: CellState[][];
  isEnded: boolean;
};
export interface ServerMessage {
  type: "client" | "game";
  error?: string;
}

export interface ClientTypeMessage extends ServerMessage {
  status: "SEARCHING" | "WAITING" | "PLAYING";
  room?: string;
}

export interface GameTypeMessage extends ServerMessage {
  board: number[][];
  elapsedTurn: number;
  currentTurn: number;
  isEnded: boolean;
}
