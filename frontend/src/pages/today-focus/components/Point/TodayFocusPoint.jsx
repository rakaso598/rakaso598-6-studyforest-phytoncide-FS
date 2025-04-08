import styles from "./TodayFocusPoint.module.css";

const TodayFocusPoint = ({ tempPoint }) => {
  return (
    <section className={styles.pointContainer}>
      <p className={styles.pointTxt}>현재까지 획득한 포인트</p>
      <div className={styles.point}>
        <img src="/images/icon/ic_point.svg" alt="포인트" />
        <p className={styles.pointTotalTxt}>{tempPoint}P 획득</p>
      </div>
    </section>
  );
};

export default TodayFocusPoint;
