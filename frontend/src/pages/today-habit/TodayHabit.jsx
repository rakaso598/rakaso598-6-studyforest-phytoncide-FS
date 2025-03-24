import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TodayHabit.module.css";
import Habits from "../../components/Habits";
import dayjs from "dayjs";

const TodayHabit = () => {
  const currentTime = dayjs().format("YYYY-MM-DD HH:mm");
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
    <div className={styles["container"]}>
      <div className={styles["main-container"]}>
        <div className={styles["top-container"]}>
          <div className={styles["title-container"]}>
            <p className={styles["title"]}>title</p>
            <div className={styles["link-container"]}>
              <Link to="/today-focus" className={styles["link-text"]}>
                오늘의 집중 &gt;
              </Link>
              <Link to="/" className={styles["link-text"]}>
                홈 &gt;
              </Link>
            </div>
          </div>
          <div className={styles["time-container"]}>
            <p className={styles["time-title"]}>현재 시간</p>
            <div className={styles["time-now"]}>{currentTime}</div>
          </div>
        </div>
        <div className={styles["habit-container"]}>
          <div className={styles["habit-top-container"]}>
            <p className={styles["habit-title"]}>오늘의 습관</p>
            <p className={styles["list-text"]}>목록 수정</p>
          </div>
          <div>
            <Habits />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHabit;
