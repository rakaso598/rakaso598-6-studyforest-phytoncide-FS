import React, { useState } from "react";
import styles from "./Habits.module.css";

function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, title: "미라클 모닝", checked: false },
    { id: 2, title: "아침 챙겨 먹기", checked: false },
  ]);
  const HandleClick = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, checked: !habit.checked } : habit
      )
    );
  };
  return (
    <div className={styles.habitList}>
      {habits.length === 0 ? (
        <p className={styles["noHabitText"]}>
          아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요{" "}
        </p>
      ) : (
        habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => HandleClick(habit.id)}
            className={
              habit.checked ? styles.habitChecked : styles.habitUnchecked
            }
          >
            {habit.title}
          </button>
        ))
      )}
    </div>
  );
}

export default Habits;
