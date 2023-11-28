import { useEffect, useState } from "react";

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

const socket = new WebSocket(`ws://${HOST}:${PORT}`);

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
    isEnded: false,
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
      socket.send(`put ${position[0]} ${position[1]}`),
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
      console.info("server> ", data);

      switch (data.type) {
        case "client": {
          const clientData = data as ClientTypeMessage;
          switch (clientData.status) {
            case "SEARCHING": {
              setClientStatus(ClientStatus.SEARCHING);
              break;
            }
            case "WAITING": {
              setClientStatus(ClientStatus.WAITING);
              setRoom(clientData.room!);
              break;
            }
            case "PLAYING": {
              setClientStatus(ClientStatus.PLAYING);
              setRoom(clientData.room!);
              break;
            }
          }
          break;
        }

        case "game": {
          const gameData = data as GameTypeMessage;
          console.log(gameData);
          const newGameStatus: GameStatus = {
            elapsedTurn: gameData.elapsedTurn,
            isMyTurn: gameData.isMyTurn,
            board: gameData.board.map((row) =>
              row.map((cell) => cell as CellState)
            ),
            isEnded: gameData.isEnded,
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
