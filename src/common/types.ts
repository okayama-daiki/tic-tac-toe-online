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
  isMyTurn: boolean;
  board: CellState[][];
  result?: string;
};

export interface ServerMessage {
  type: "Status" | "Game";
  error?: string;
  statusMessage?: StatusMessage;
  gameMessage?: GameMessage;
}

export interface StatusMessage {
  status: "Searching" | "Waiting" | "Playing";
  roomName?: string;
}

export interface GameMessage {
  board: number[];
  elapsedTurn: number;
  isMyTurn: boolean;
  result?: string;
}
