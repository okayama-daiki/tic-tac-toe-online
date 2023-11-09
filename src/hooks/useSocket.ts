import { useEffect, useState } from "react";

import { ClientStatus } from "../common/types";

const HOST = "0.0.0.0";
const PORT = 5432;

interface ServerMessage {
  type: "client" | "game";
}

interface ClientTypeMessage extends ServerMessage {
  status: "SEARCHING" | "WAITING" | "PLAYING";
  room?: string;
}

interface GameTypeMessage extends ServerMessage {
  board: number[][];
  elapsedTurn: number;
  currentTurn: number;
  isEnded: boolean;
}

export default function useSocket() {
  const [socket, setSocket] = useState<WebSocket>();
  const [status, setStatus] = useState<ClientStatus>(ClientStatus.SEARCHING);

  useEffect(() => {
    const socket = new WebSocket(`ws://${HOST}:${PORT}`);
    setSocket(socket);

    socket.addEventListener("open", () => {
      console.log("Connected to server");
    });

    socket.addEventListener("message", (event) => {
      const data: ServerMessage = JSON.parse(event.data);

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
              break;
            }
            case "PLAYING": {
              setStatus(ClientStatus.PLAYING);
              break;
            }
          }
          break;
        }

        case "game": {
          const gameData = data as GameTypeMessage;
          gameData;
          break;
        }
      }
    });

    socket.addEventListener("error", (event) => {
      console.log("Error: ", event);
    });

    socket.addEventListener("close", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.close();
    };
  }, []);

  return socket;
}
