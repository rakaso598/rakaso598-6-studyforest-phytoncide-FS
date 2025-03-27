import React from "react";
import styles from "./HabitRecordTable.module.css";
import sticker from "/images/stickers/sticker_empty.svg";

function HabitRecordTable() {
  // mock data 나중에 DB 불러와서 수정
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
      "#a1d63f",
      "#7ec16b",
      "#31e877",
      "#1fcdcd",
      "#C2D94C",
    ];
    return colors[rowIndex] || "#ffffffca";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>습관 기록표</h1>
    </div>
  );
}
export default HabitRecordTable;
