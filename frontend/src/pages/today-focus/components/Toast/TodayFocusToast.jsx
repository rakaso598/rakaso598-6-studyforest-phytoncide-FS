import clsx from "clsx";
import styles from "./TodayFocusToast.module.css";
import { useTimerState } from "@contexts/timerState.context";

const TodayFocusToast = ({ point }) => {
  const { timerState } = useTimerState();
  const { isPause, isComplete } = timerState;

  return (
    <aside className={styles.toastContainer}>
      <p className={clsx(styles.toastWarning, isPause && styles.show)}>
        🚨 집중이 중단되었습니다.
      </p>
      <p className={clsx(styles.toastPoint, isComplete && styles.show)}>
        🎉 {point}포인트를 획득했습니다!
      </p>
    </aside>
  );
};

export default TodayFocusToast;
