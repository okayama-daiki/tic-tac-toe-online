import { useState } from "react";

import * as styles from "./Lobby.css";

type LobbyProps = {
  create: (room: string) => void;
  join: (room: string) => void;
  error?: string;
};

export default function Lobby({ create, join, error }: LobbyProps) {
  const [room, setRoom] = useState<string>("");

  return (
    <div className={styles.lobby}>
      <div className={`${styles.box} ${error && styles.shake}`}>
        <h1 className={styles.gameTitle}>Tic-Tac-Toe Online</h1>
        <div className={styles.inputBox}>
          <input
            id="room"
            className={styles.input}
            type="text"
            autoComplete="off"
            required
            value={room}
            tabIndex={1}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <label htmlFor="room" className={styles.label}>
            room number
          </label>
        </div>
        <p className={styles.errorMessage}>{error}</p>
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
