import { useEffect, useRef, useState } from "react";

import useGame from "./useGame";
import {
  ClientStatus,
  ServerMessage,
  ClientTypeMessage,
  GameTypeMessage,
  CellState,
} from "../common/types";
import type { QueryType, GameStatus } from "../common/types";

const HOST = "0.0.0.0";
const PORT = 5174;

export default function useSocket(): [
  QueryType,
  ClientStatus,
  string,
  GameStatus
] {
  const socketRef = useRef<WebSocket>(new WebSocket(`ws://${HOST}:${PORT}`));
  const socket = socketRef.current;
  const [status, setStatus] = useState<ClientStatus>(ClientStatus.SEARCHING);
  const [room, setRoom] = useState<string>("");

  const [
    elapsedTurn,
    setElapsedTurn,
    currentTurn,
    setCurrentTurn,
    board,
    setBoard,
    isEnded,
    setIsEnded,
  ] = useGame();

  const query = {
    create: (room: string) => socket.send(`create ${room}`),
    join: (room: string) => socket.send(`join ${room}`),
    leave: () => socket.send("leave"),
    put: (position: [number, number]) =>
      socket.send(`put ${position[0]} ${position[1]}`),
    restart: () => socket.send("restart"),
    exit: () => socket.send("exit"),
  };

  const game = {
    elapsedTurn,
    currentTurn,
    board,
    isEnded,
  };

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.debug("Connected to server");
    });

    socket.addEventListener("message", (event) => {
      const data: ServerMessage = JSON.parse(event.data);
      console.info("server> ", data);

      switch (data.type) {
        case "client": {
          const clientData = data as ClientTypeMessage;
          switch (clientData.status) {
            case "SEARCHING": {
              setStatus(ClientStatus.SEARCHING);
              break;
            }
            case "WAITING": {
              setStatus(ClientStatus.WAITING);
              setRoom(clientData.room!);
              break;
            }
            case "PLAYING": {
              setStatus(ClientStatus.PLAYING);
              setRoom(clientData.room!);
              break;
            }
          }
          break;
        }

        case "game": {
          const gameData = data as GameTypeMessage;
          setElapsedTurn(gameData.elapsedTurn);
          setCurrentTurn(gameData.currentTurn);
          setBoard(
            gameData.board.map((row) => row.map((cell) => cell as CellState))
          );
          setIsEnded(gameData.isEnded);
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

  return [query, status, room, game];
}
