import clsx from "clsx";
import styles from "./TodayFocusTimerBtn.module.css";

const TodayFocusTimerBtn = ({
  isTimeover,
  isBtnVisible,
  handleStartClick,
  handlePauseClick,
  handleResetClick,
}) => {
  return (
    <div className={styles.focusBtnContainer}>
      <button
        onClick={handlePauseClick}
        className={clsx(styles.focusPauseBtn, isBtnVisible && styles.show)}
      >
        <img src="/images/icon/ic_pause.svg" alt="일시정지" />
      </button>
      <button
        disabled={isBtnVisible}
        onClick={handleStartClick}
        className={clsx(styles.focusStartBtn, isBtnVisible && styles.disable)}
      >
        <img
          src={
            isTimeover ? "/images/icon/ic_stop.svg" : "/images/icon/ic_play.svg"
          }
          alt="시작"
        />
        <p>{isTimeover ? "Stop!" : "Start!"}</p>
      </button>
      <button
        onClick={handleResetClick}
        className={clsx(styles.focusResetBtn, isBtnVisible && styles.show)}
      >
        <img src="/images/icon/ic_restart.svg" alt="초기화" />
      </button>
    </div>
  );
};

export default TodayFocusTimerBtn;
