import * as styles from "./Waiting.css";

type WaitingProps = {
  back: () => void;
  roomNo: string;
};

export default function Waiting({ back, roomNo }: WaitingProps) {
  return (
    <div className={styles.waiting}>
      <div className={styles.buttonContainer}>
        <a
          className={styles.button}
          tabIndex={1}
          onClick={back}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              back();
            }
          }}
        >
          Back
        </a>
      </div>
      <div className={styles.board}>
        <div className={`${styles.face} ${styles.firstFace}`}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
          <div className={styles.line4}></div>
          <div className={styles.cross}></div>
        </div>
        <div className={`${styles.face} ${styles.secondFace}`}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
          <div className={styles.line4}></div>
          <div className={styles.cross}></div>
          <div className={styles.nought}></div>
        </div>
        <div className={`${styles.face} ${styles.thirdFace}`}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
          <div className={styles.line4}></div>
          <div className={styles.cross}></div>
          <div className={styles.cross2}></div>
          <div className={styles.nought}></div>
        </div>
      </div>
      <div className={styles.message}>
        <p>
          You are in room <span className={styles.roomNo}>{roomNo}</span>
        </p>
        <p>Waiting for your friend to join...</p>
      </div>
    </div>
  );
}
