import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "@today-habit/CurrentTime.module.css";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(
    dayjs()
      .format("YYYY-MM-DD A HH:mm")
      .replace("AM", "오전")
      .replace("PM", "오후")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        dayjs()
          .format("YYYY-MM-DD A HH:mm")
          .replace("AM", "오전")
          .replace("PM", "오후"),
        1000
      );
      return () => clearInterval(interval);
    });
  });
  return (
    <div className={styles.timeContainer}>
      <p className={styles.timeTitle}>현재 시간</p>
      <div className={styles.timeNow}>{currentTime}</div>
    </div>
  );
}

export default CurrentTime;
