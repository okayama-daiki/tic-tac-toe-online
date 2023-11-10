import useSocket from "./hooks/useSocket";

import Lobby from "./components/Lobby/Lobby";
import Waiting from "./components/Waiting/Waiting";
import Game from "./components/Game/Game";

import { ClientStatus } from "./common/types";

import "./App.css";

export default function App() {
  const [clientStatus, gameStatus, room, query] = useSocket();

  return (
    <main>
      {clientStatus === ClientStatus.SEARCHING && (
        <Lobby create={query.create} join={query.join}></Lobby>
      )}
      {clientStatus === ClientStatus.WAITING && (
        <Waiting back={query.leave} roomNo={room}></Waiting>
      )}
      {clientStatus === ClientStatus.PLAYING && (
        <Game
          turn={gameStatus.currentTurn}
          board={gameStatus.board}
          result={""}
          put={query.put}
          restart={query.restart}
          exit={query.exit}
        ></Game>
      )}
    </main>
  );
}
