import { useState, useEffect } from "react";
import useGame from "./hooks/useGame";

import Lobby from "./components/Lobby";
import Waiting from "./components/Waiting";
import Game from "./components/Game";

import { CellState, ClientStatus } from "./common/types";

export default function App() {
  const [status, setClientStatus] = useState<ClientStatus>(
    ClientStatus.SEARCHING
  );
  const [roomNo, setRoomNo] = useState<string>("");
  const [onClickFunctions, setOnClickFunctions] = useState<{
    onClickCreate: (roomNo: string) => void;
    onClickJoin: (roomNo: string) => void;
    put: (y: number, x: number) => void;
  }>({
    onClickCreate: (_) => {},
    onClickJoin: (_) => {},
    put: (_, __) => {},
  });

  const [turn, setTurn, board, setBoard] = useGame();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888");

    socket.addEventListener("open", (_) => {
      const onClickCreate = (roomNo: string) => {
        socket.send(`create ${roomNo}`);
      };
      const onClickJoin = (roomNo: string) => {
        socket.send(`join ${roomNo}`);
      };
      const put = (y: number, x: number) => {
        socket.send(`put ${y} ${x}`);
      };
      setOnClickFunctions({
        onClickJoin,
        onClickCreate,
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
            if (_board[y * 3 + x] == "o") {
              board[y][x] = CellState.NOUGHT;
            }
            if (_board[y * 3 + x] == "x") {
              board[y][x] = CellState.CROSS;
            }
          }
        }
        setBoard(board);
        setTurn(turn + 1);
      }
    });

    socket.addEventListener("close", (_) => {
      console.log("Connection closed");
    });
  }, []);

  return (
    <>
      {status !== ClientStatus.PLAYING && (
        <>
          <Lobby
            roomNo={roomNo}
            setRoomNo={setRoomNo}
            onClickCreate={onClickFunctions.onClickCreate}
            onClickJoin={onClickFunctions.onClickJoin}
          ></Lobby>
        </>
      )}
      {status === ClientStatus.WAITING && <Waiting></Waiting>}
      {status === ClientStatus.PLAYING && (
        <Game put={onClickFunctions.put} turn={turn} board={board}></Game>
      )}
    </>
  );
}
