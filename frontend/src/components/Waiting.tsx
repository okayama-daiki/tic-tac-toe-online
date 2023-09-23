import * as styles from "./Waiting.css";

type WaitingProps = {
  back: () => void;
};

export default function Waiting({ back }: WaitingProps) {
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
          <div className={styles.dot}></div>
        </div>
        <div className={`${styles.face} ${styles.firstFace}`}>
          <div className={styles.dot}></div>
        </div>
        <div className={`${styles.face} ${styles.firstFace}`}>
          <div className={styles.dot}></div>
        </div>
      </div>
      <div className={styles.message}>
        <p>You are in roomNo</p>
        <p>Waiting for your friend to join...</p>
      </div>
    </div>
  );
}
