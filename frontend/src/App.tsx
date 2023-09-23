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
  const [roomNo, setRoomNo] = useState<string>("");
  const [errorMessageLobby, setErrorMessageLobby] = useState<string>("");
  const [errorShaking, setErrorShaking] = useState<boolean>(false);

  const [propsFunctions, setPropsFunctions] = useState<{
    create: (roomNo: string) => void;
    leave: () => void;
    join: (roomNo: string) => void;
    put: (y: number, x: number) => void;
  }>({
    create: (_) => {},
    leave: () => {},
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
      const leave = () => {
        socket.send("leave");
      };
      const join = (roomNo: string) => {
        socket.send(`join ${roomNo}`);
      };
      const put = (y: number, x: number) => {
        socket.send(`put ${y} ${x}`);
      };
      setPropsFunctions({
        create,
        leave,
        join,
        put,
      });
    });

    socket.addEventListener("message", (event) => {
      console.log("server>", event.data);

      const msg: string = event.data;

      if (msg.startsWith("success to create room")) {
        setClientStatus(ClientStatus.WAITING);
        setErrorMessageLobby("");
        setErrorShaking(false);
      }

      if (msg.startsWith("success to join room")) {
        setErrorMessageLobby("");
        setErrorShaking(false);
      }

      if (msg == "game started") {
        setClientStatus(ClientStatus.PLAYING);
        setErrorMessageLobby("");
        setErrorShaking(false);
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

      if (msg == "The room number must be 1~6 digits.") {
        setErrorMessageLobby(msg);
        setErrorShaking(true);
        setTimeout(() => {
          setErrorShaking(false);
        }, 520);
      }

      if (msg.endsWith("already exist.") || msg.endsWith("not exist.")) {
        setErrorMessageLobby(msg);
        setErrorShaking(true);
        setTimeout(() => {
          setErrorShaking(false);
        }, 520);
      }
    });

    socket.addEventListener("close", (_) => {
      console.log("Connection closed");
    });
  }, []);

  const backToLobby = () => {
    setClientStatus(ClientStatus.SEARCHING);
    propsFunctions.leave();
  };

  return (
    <>
      {status === ClientStatus.SEARCHING && (
        <>
          <Lobby
            onClickCreate={propsFunctions.create}
            onClickJoin={propsFunctions.join}
            roomNo={roomNo}
            setRoomNo={setRoomNo}
            errorMessage={errorMessageLobby}
            errorShaking={errorShaking}
          ></Lobby>
        </>
      )}
      {status === ClientStatus.WAITING && (
        <Waiting back={backToLobby} roomNo={roomNo}></Waiting>
      )}
      {status === ClientStatus.PLAYING && (
        <Game put={propsFunctions.put} turn={turn} board={board}></Game>
      )}
    </>
  );
}
