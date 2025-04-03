import styles from "./TodayFocusTimerBtn.module.css";

const TodayFocusTimerBtn = ({
  timeover,
  btnToggle,
  handleStartClick,
  handlePauseClick,
  handleResetClick,
}) => {
  return (
    <div className={styles.focusBtnContainer}>
      <button
        onClick={handlePauseClick}
        className={`${styles.focusPauseBtn} ${btnToggle && styles.show}`}
      >
        <img src="/images/icon/ic_pause.svg" alt="일시정지" />
      </button>
      <button
        disabled={btnToggle}
        onClick={handleStartClick}
        className={`${styles.focusStartBtn} ${btnToggle && styles.disable}`}
      >
        <img
          src={
            timeover ? "/images/icon/ic_stop.svg" : "/images/icon/ic_play.svg"
          }
          alt="시작"
        />
        <p>{timeover ? "Stop!" : "Start!"}</p>
      </button>
      <button
        onClick={handleResetClick}
        className={`${styles.focusResetBtn} ${btnToggle && styles.show}`}
      >
        <img src="/images/icon/ic_restart.svg" alt="초기화" />
      </button>
    </div>
  );
};

export default TodayFocusTimerBtn;
