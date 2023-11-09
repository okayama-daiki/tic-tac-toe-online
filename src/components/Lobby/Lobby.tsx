import { useState } from "react";

import * as styles from "./Lobby.css";

type LobbyProps = {
  create: (room: string) => void;
  join: (room: string) => void;
};

export default function Lobby({ create, join }: LobbyProps) {
  const [room, setRoom] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorShaking, setErrorShaking] = useState<boolean>(false);

  return (
    <div className={styles.lobby}>
      <div className={`${styles.box} ${errorShaking ? styles.shake : ""}`}>
        <h1 className={styles.gameTitle}>Tic-Tac-Toe Online</h1>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            required
            value={room}
            tabIndex={1}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <label className={styles.label}>room number</label>
        </div>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <div>
          <a
            className={styles.button}
            tabIndex={2}
            onClick={() => {
              create(room);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                create(room);
              }
            }}
          >
            create
          </a>
          <a
            className={styles.button}
            tabIndex={3}
            onClick={() => join(room)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                join(room);
              }
            }}
          >
            join
          </a>
        </div>
      </div>
    </div>
  );
}
