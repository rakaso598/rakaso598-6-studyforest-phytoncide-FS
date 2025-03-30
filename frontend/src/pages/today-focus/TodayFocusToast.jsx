import styles from "./TodayFocus.module.css";

const TodayFocusToast = ({ pause, complete, point }) => {
  return (
    <div className={styles.toastContainer}>
      {pause && (
        <p className={styles.toastWarning}>🚨 집중이 중단되었습니다.</p>
      )}
      {complete && (
        <p className={styles.toastPoint}>🎉 {point}포인트를 획득했습니다!</p>
      )}
    </div>
  );
};

export default TodayFocusToast;
