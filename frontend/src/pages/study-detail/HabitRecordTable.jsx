import React from "react";
import styles from "./HabitRecordTable.module.css";
import sticker from "/images/stickers/sticker_empty.svg";

function HabitRecordTable() {
  // Mock data - 나중에 DB 불러와서 수정
  const habits = [
    "미라클모닝 6시 기상",
    "30분 유산소",
    "5분 아침 명상",
    "건강하게 먹기",
    "1시간 수영",
    "찬물샤워",
  ];

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const getRowColor = (rowIndex) => {
    const colors = [
      "#D2E869",
      "#B2D570",
      "#99C08E",
      "#5CE1E6",
      "#7ECFCF",
      "#C2D94C",
    ];
    // 수정해야함
    return colors[rowIndex] || "#e86987";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>습관 기록표</h1>

      <div className={styles.gridContainer}>
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

        {/* Habit rows */}
        {habits.map((habit, rowIndex) => (
          <div key={`habit-${rowIndex}`} className={styles.habitRow}>
            <div className={styles.habitNameCell}>{habit}</div>
            <div className={styles.statusCells}>
              {days.map((_, dayIndex) => (
                <div
                  key={`status-${rowIndex}-${dayIndex}`}
                  className={styles.statusCell}
                >
                  <div className={styles.stickerWrapper}>
                    <img
                      src={sticker}
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
