import { useState, useEffect } from "react";
import useGame from "./hooks/useGame";

import Lobby from "./components/Lobby";
import Waiting from "./components/Waiting";
import Game from "./components/Game";

import { CellState, ClientStatus } from "./common/types";

import "./App.css";

export default function App() {
  const [status, setClientStatus] = useState<ClientStatus>(
    ClientStatus.SEARCHING
  );
  const [propsFunctions, setPropsFunctions] = useState<{
    create: (roomNo: string) => void;
    join: (roomNo: string) => void;
    put: (y: number, x: number) => void;
  }>({
    create: (_) => {},
    join: (_) => {},
    put: (_, __) => {},
  });

  const [turn, nextTurn, board, setBoard] = useGame();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888");

    socket.addEventListener("open", (_) => {
      const create = (roomNo: string) => {
        socket.send(`create ${roomNo}`);
      };
      const join = (roomNo: string) => {
        socket.send(`join ${roomNo}`);
      };
      const put = (y: number, x: number) => {
        socket.send(`put ${y} ${x}`);
      };
      setPropsFunctions({
        create,
        join,
        put,
      });
    });

    socket.addEventListener("message", (event) => {
      console.log("server>", event.data);

      const msg: string = event.data;

      if (msg.startsWith("success to create room")) {
        setClientStatus(ClientStatus.WAITING);
      }

      if (msg.startsWith("success to join room")) {
      }

      if (msg == "game started") {
        setClientStatus(ClientStatus.PLAYING);
      }

      if (msg.startsWith("board")) {
        const [_, _board] = msg.split(" ");
        const board: CellState[][] = [
          [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
          [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
          [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
        ];
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            if (_board[y * 3 + x] == "o") board[y][x] = CellState.NOUGHT;
            if (_board[y * 3 + x] == "x") board[y][x] = CellState.CROSS;
          }
        }
        setBoard(board);
        nextTurn();
      }
    });

    socket.addEventListener("close", (_) => {
      console.log("Connection closed");
    });
  }, []);

  const backToLobby = () => {
    setClientStatus(ClientStatus.SEARCHING);
  };

  return (
    <>
      {status === ClientStatus.SEARCHING && (
        <>
          <Lobby
            onClickCreate={propsFunctions.create}
            onClickJoin={propsFunctions.join}
          ></Lobby>
        </>
      )}
      {status === ClientStatus.WAITING && (
        <Waiting back={backToLobby}></Waiting>
      )}
      {status === ClientStatus.PLAYING && (
        <Game put={propsFunctions.put} turn={turn} board={board}></Game>
      )}
    </>
  );
}
