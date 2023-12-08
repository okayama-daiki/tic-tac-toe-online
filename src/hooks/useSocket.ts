import { useEffect, useState } from "react";

import {
  ClientStatus,
  ServerMessage,
  StatusMessage,
  GameMessage,
  CellState,
} from "../common/types";
import type { QueryType, GameStatus } from "../common/types";

const socket = new WebSocket(import.meta.env.VITE_WSS_URI);

export default function useSocket(): [
  ClientStatus,
  GameStatus,
  string,
  string,
  QueryType
] {
  const [clientStatus, setClientStatus] = useState<ClientStatus>(
    ClientStatus.SEARCHING
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    elapsedTurn: 0,
    isMyTurn: true,
    board: Array(3).fill(Array(3).fill(CellState.EMPTY)),
    result: "",
  });
  const [room, setRoom] = useState<string>("");
  const [error, setError] = useState<string>("");

  const query = {
    create: (room: string) => {
      setError("");
      socket.send(`create ${room}`);
    },
    join: (room: string) => {
      setError("");
      socket.send(`join ${room}`);
    },
    leave: () => socket.send("leave"),
    put: (position: [number, number]) =>
      socket.send(`put ${position[0] * 3 + position[1]}`),
    restart: () => socket.send("restart"),
    exit: () => socket.send("exit"),
  };

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.debug("Connected to server");
    });

    socket.addEventListener("message", (event) => {
      const data: ServerMessage = JSON.parse(event.data);
      data.error && setError(data.error);
      console.debug("server> ", data);

      switch (data.type) {
        case "Status": {
          const statusMessage = data.statusMessage as StatusMessage;
          switch (statusMessage.status) {
            case "Searching": {
              setClientStatus(ClientStatus.SEARCHING);
              break;
            }
            case "Waiting": {
              setClientStatus(ClientStatus.WAITING);
              setRoom(statusMessage.roomName!);
              break;
            }
            case "Playing": {
              setClientStatus(ClientStatus.PLAYING);
              setRoom(statusMessage.roomName!);
              break;
            }
          }
          break;
        }

        case "Game": {
          const gameMessage = data.gameMessage as GameMessage;
          const gameBoard2d = Array(3);
          for (let i = 0; i < 3; i++) {
            gameBoard2d[i] = Array(3);
            for (let j = 0; j < 3; j++) {
              gameBoard2d[i][j] = gameMessage.board[i * 3 + j] as CellState;
            }
          }
          const newGameStatus: GameStatus = {
            elapsedTurn: gameMessage.elapsedTurn,
            isMyTurn: gameMessage.isMyTurn,
            board: gameBoard2d,
            result: gameMessage.result,
          };
          setGameStatus(newGameStatus);
          break;
        }
      }
    });

    socket.addEventListener("error", (event) => {
      console.error("Error: ", event);
    });

    socket.addEventListener("close", () => {
      console.debug("Disconnected from server");
    });

    return () => {};
  }, []);

  return [clientStatus, gameStatus, room, error, query];
}
