import { useState } from "react";
import * as styles from "./Lobby.css";

type LobbyProps = {
  onClickCreate: (roomNo: string) => void;
  onClickJoin: (roomNo: string) => void;
};

export default function Lobby({ onClickCreate, onClickJoin }: LobbyProps) {
  const [roomNo, setRoomNo] = useState<string>("");

  return (
    <div className={styles.lobby}>
      <h1>Tic-Tac-Toe Online</h1>
      <div>room no</div>
      <input
        type="text"
        value={roomNo}
        onChange={(e) => {
          setRoomNo(e.target.value);
        }}
      />
      <div>
        <button
          onClick={() => {
            onClickCreate(roomNo);
          }}
        >
          create
        </button>
        <button onClick={() => onClickJoin(roomNo)}>join</button>
      </div>
    </div>
  );
}
