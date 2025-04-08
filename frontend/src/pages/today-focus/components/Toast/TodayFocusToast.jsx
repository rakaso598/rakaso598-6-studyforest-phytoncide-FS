import clsx from "clsx";
import styles from "./TodayFocusToast.module.css";

const TodayFocusToast = ({ pause, complete, point }) => {
  return (
    <aside className={styles.toastContainer}>
      <p className={clsx(styles.toastWarning, pause && styles.show)}>
        🚨 집중이 중단되었습니다.
      </p>
      <p className={clsx(styles.toastPoint, complete && styles.show)}>
        🎉 {point}포인트를 획득했습니다!
      </p>
    </aside>
  );
};

export default TodayFocusToast;
