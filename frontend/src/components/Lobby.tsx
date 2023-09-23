import * as styles from "./Lobby.css";

type LobbyProps = {
  onClickCreate: (roomNo: string) => void;
  onClickJoin: (roomNo: string) => void;
  roomNo: string;
  setRoomNo: (roomNo: string) => void;
  errorMessage: string;
  errorShaking: boolean;
};

export default function Lobby({
  onClickCreate,
  onClickJoin,
  roomNo,
  setRoomNo,
  errorMessage,
  errorShaking,
}: LobbyProps) {
  return (
    <div className={styles.lobby}>
      <div className={`${styles.box} ${errorShaking ? styles.shake : ""}`}>
        <h1 className={styles.gameTitle}>Tic-Tac-Toe Online</h1>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            required
            value={roomNo}
            tabIndex={1}
            onChange={(e) => {
              setRoomNo(e.target.value);
            }}
          />
          <label className={styles.label}>room number</label>
        </div>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <div className={``}>
          <a
            className={styles.button}
            tabIndex={2}
            onClick={() => {
              onClickCreate(roomNo);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClickCreate(roomNo);
              }
            }}
          >
            create
          </a>
          <a
            className={styles.button}
            tabIndex={3}
            onClick={() => onClickJoin(roomNo)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClickJoin(roomNo);
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
