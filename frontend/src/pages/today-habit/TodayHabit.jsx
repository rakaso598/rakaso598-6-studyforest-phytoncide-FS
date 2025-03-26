import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@today-habit/TodayHabit.module.css";
import Habits from "@components/Habits";
import dayjs from "dayjs";

const TodayHabit = () => {
  const currentTime = dayjs()
    .format("YYYY-MM-DD A HH:mm")
    .replace("AM", "오전")
    .replace("PM", "오후");
  const [runningTime, setRunningTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTime(currentTime);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>title</p>
            <div className={styles.linkContainer}>
              <Link to="/today-focus" className={styles.link}>
                <p className={styles.linkText}>오늘의 집중</p>
                <img src="/images/icon/ic_arrow_right.svg" />
              </Link>
              <Link to="/" className={styles.link}>
                <p>홈</p>
                <img src="/images/icon/ic_arrow_right.svg" />
              </Link>
            </div>
          </div>
          <div className={styles.timeContainer}>
            <p className={styles.timeTitle}>현재 시간</p>
            <div className={styles.timeNow}>{currentTime}</div>
          </div>
        </div>
        <div className={styles.habitContainer}>
          <div className={styles.habitTopContainer}>
            <p className={styles.habitTitle}>오늘의 습관</p>
            <p className={styles.listText}>목록 수정</p>
          </div>
          <Habits />
        </div>
      </div>
    </div>
  );
};

export default TodayHabit;
