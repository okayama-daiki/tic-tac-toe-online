import * as styles from "./Lobby.css";

type LobbyProps = {
  roomNo: string;
  setRoomNo: (roomNo: string) => void;
  onClickCreate: (roomNo: string) => void;
  onClickJoin: (roomNo: string) => void;
};

export default function Lobby({
  roomNo,
  setRoomNo,
  onClickCreate,
  onClickJoin,
}: LobbyProps) {
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
