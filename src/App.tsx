import useSocket from "./hooks/useSocket";

import Lobby from "./components/Lobby/Lobby";
import Waiting from "./components/Waiting/Waiting";
import Game from "./components/Game/Game";

import { ClientStatus } from "./common/types";

import "./App.css";

export default function App() {
  const [query, status, room, game] = useSocket();

  return (
    <main>
      {status === ClientStatus.SEARCHING && (
        <Lobby create={query.create} join={query.join}></Lobby>
      )}
      {status === ClientStatus.WAITING && (
        <Waiting back={query.leave} roomNo={room}></Waiting>
      )}
      {status === ClientStatus.PLAYING && (
        <Game
          turn={game.currentTurn}
          board={game.board}
          result={""}
          put={query.put}
          restart={query.restart}
          exit={query.exit}
        ></Game>
      )}
    </main>
  );
}
