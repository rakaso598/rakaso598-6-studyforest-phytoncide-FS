import clsx from "clsx";
import styles from "./TodayFocusTimerBtn.module.css";
import { useTimerState } from "@contexts/timerState.context";

const TodayFocusTimerBtn = ({ minute, second, resetTimer }) => {
  const { timerState, setTimerState } = useTimerState();
  const { isStart, isTimeOver, isBtnVisible } = timerState;

  // 시작 버튼
  const handleStartClick = () => {
    if (!isTimeOver && minute === "00" && second === "00") return;
    if (isStart) {
      resetTimer();
      setTimerState((prevState) => ({
        ...prevState,
        isStart: false,
        isDisabled: false,
        isCountDown: false,
        isTimeOver: false,
        isComplete: true,
      }));
      return;
    }
    setTimerState((prevState) => ({
      ...prevState,
      isStart: true,
      isDisabled: true,
      isBtnVisible: true,
    }));
  };

  // 일시 정지 버튼
  const handlePauseClick = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isStart: false,
      isPause: true,
      isBtnVisible: false,
    }));
  };

  // 리셋 버튼
  const handleResetClick = () => {
    resetTimer();
    setTimerState((prevState) => ({
      ...prevState,
      isStart: false,
      isDisabled: false,
      isCountDown: false,
      isTimeOver: false,
      isBtnVisible: false,
    }));
  };

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
            isTimeOver ? "/images/icon/ic_stop.svg" : "/images/icon/ic_play.svg"
          }
          alt="시작"
        />
        <p>{isTimeOver ? "Stop!" : "Start!"}</p>
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
