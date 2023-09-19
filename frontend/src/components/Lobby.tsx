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
      <div className={styles.box}>
        <h1 className={styles.gameTitle}>Tic-Tac-Toe Online</h1>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            required
            value={roomNo}
            onChange={(e) => {
              setRoomNo(e.target.value);
            }}
          />
          <label className={styles.label}>room number</label>
        </div>
        <div>
          <a
            className={styles.button}
            onClick={() => {
              onClickCreate(roomNo);
            }}
          >
            create
          </a>
          <a className={styles.button} onClick={() => onClickJoin(roomNo)}>
            join
          </a>
        </div>
      </div>
    </div>
  );
}
