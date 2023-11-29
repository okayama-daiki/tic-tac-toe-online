import * as styles from "./BackButton.css";

type BackButtonProps = {
  label: string;
  onClick: () => void;
};

export default function BackButton({ label, onClick }: BackButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button
        id="button"
        className={styles.button}
        tabIndex={1}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
      >
        <img src="right.svg" alt="" className={styles.arrow} />
        <label htmlFor="button" className={styles.label}>
          {label}
        </label>
      </button>
    </div>
  );
}
