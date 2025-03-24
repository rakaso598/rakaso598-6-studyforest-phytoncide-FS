import React from "react";
import styles from "./Habits.module.css";

function Habits() {
  return (
    <div className={styles["habit-list"]}>
      <div className={styles["habit-checked"]}>미라클 모닝</div>
      <div className={styles["habit-unchecked"]}>아침 챙겨 먹기</div>
      <p className={styles["no-habit-text"]}>
        아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요{" "}
      </p>
    </div>
  );
}

export default Habits;
