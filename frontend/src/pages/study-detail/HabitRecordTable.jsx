import React, { useState, useEffect } from "react";
import styles from "./HabitRecordTable.module.css";
import stickerWhite from "/images/stickers/sticker-white.svg";
import stickerBlue100 from "/images/stickers/sticker-blue-100.svg";
import stickerBlue200 from "/images/stickers/sticker-blue-200.svg";
import stickerBlue300 from "/images/stickers/sticker-blue-300.svg";
import stickerBlue400 from "/images/stickers/sticker-blue-400.svg";
import stickerBlue500 from "/images/stickers/sticker-blue-500.svg";
import stickerGreen100 from "/images/stickers/sticker-green-100.svg";
import stickerGreen200 from "/images/stickers/sticker-green-200.svg";
import stickerGreen300 from "/images/stickers/sticker-green-300.svg";
import stickerGreen400 from "/images/stickers/sticker-green-400.svg";
import stickerOrange100 from "/images/stickers/sticker-orange-100.svg";
import stickerOrange200 from "/images/stickers/sticker-orange-200.svg";
import stickerOrange300 from "/images/stickers/sticker-orange-300.svg";
import stickerPink100 from "/images/stickers/sticker-pink-100.svg";
import stickerPink200 from "/images/stickers/sticker-pink-200.svg";
import stickerPink300 from "/images/stickers/sticker-pink-300.svg";
import stickerPink400 from "/images/stickers/sticker-pink-400.svg";
import stickerPurple100 from "/images/stickers/sticker-purple-100.svg";
import stickerPurple200 from "/images/stickers/sticker-purple-200.svg";
import { useParams } from "react-router-dom";
import { getAllHabits } from "@api/today-habit/habit.api";

function HabitRecordTable() {
  const { studyId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const habitData = await getAllHabits(studyId);
        setHabits(habitData);
        console.log("habit data 가져온것:", habitData);
      } catch (error) {
        console.error("Habit 데이터 가져오는데 에러발생:", error);
      } finally {
        setLoading(false);
      }
    };

    if (studyId) {
      fetchHabits();
    }
  }, [studyId]);
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const allStickers = [
    stickerBlue100,
    stickerBlue200,
    stickerBlue300,
    stickerBlue400,
    stickerBlue500,
    stickerGreen100,
    stickerGreen200,
    stickerGreen300,
    stickerGreen400,
    stickerOrange100,
    stickerOrange200,
    stickerOrange300,
    stickerPink100,
    stickerPink200,
    stickerPink300,
    stickerPink400,
    stickerPurple100,
    stickerPurple200,
  ];

  const getStickerForRow = (rowIndex) => {
    const stickerIndex = rowIndex % allStickers.length;
    return allStickers[stickerIndex];
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>습관 기록표</h1>

      <div className={styles.gridContainer}>
        {/* 요일 헤더 */}
        <div className={styles.headerRow}>
          <div className={styles.emptyHeaderCell}></div>
          <div className={styles.daysHeader}>
            {days.map((day, index) => (
              <div key={`day-${index}`} className={styles.dayCell}>
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* 습관 행열 모음 */}
        {habits.map((habit, rowIndex) => (
          <div key={`habit-${rowIndex}`} className={styles.habitRow}>
            <div className={styles.habitNameCell}>{habit.title}</div>
            <div className={styles.statusCells}>
              {days.map((_, dayIndex) => (
                <div
                  key={`status-${rowIndex}-${dayIndex}`}
                  className={styles.statusCell}
                >
                  <div className={styles.stickerWrapper}>
                    <img
                      src={stickerWhite}
                      alt="Sticker"
                      className={styles.sticker}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitRecordTable;
