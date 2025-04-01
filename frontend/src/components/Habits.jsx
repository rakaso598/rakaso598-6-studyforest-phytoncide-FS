import React, { useEffect, useState } from "react";
import styles from "@components/Habits.module.css";
import { getHabits, patchHabits } from "./HabitAPI";
import { getHabitDone, patchHabitDone, postHabitDone } from "./HabitDoneAPI";

function Habits() {
  // const [habits, setHabits] = useState([
  //   { id: 1, title: "미라클 모닝 6시 기상", checked: false },
  //   { id: 2, title: "아침 챙겨 먹기", checked: false },
  //   { id: 3, title: "React 스터디 책 1챕터 읽기", checked: false },
  //   { id: 4, title: "스트레칭", checked: false },
  //   { id: 5, title: "영양제 챙겨 먹기", checked: false },
  //   { id: 6, title: "사이드 프로젝트", checked: false },
  //   { id: 7, title: "물 2L 먹기", checked: false },
  // ]);
  const [habits, setHabits] = useState([]);
  const [habitCheck, setHabitCheck] = useState([]);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const HandleClick = async (habitId) => {
    try {
      const habitDone = await getHabitDone(habitId, today);
      if (habitDone) {
        const updateHabitDone = await patchHabitDone(habitDone.id, {
          isDone: !habitDone.isDone,
        });
        setHabitCheck((prev) =>
          prev.map((habit) =>
            habit.habitId === habitId
              ? { ...habit, isDone: !habit.isDone }
              : habit
          )
        );
      }
    } catch (e) {
      console.error(e);
      setHabits(habits);
    }

    // const habit = habits.find((habit) => habit.id === habitId);

    // if (habit) {
    //   const updatedHabits = habits.map((h) =>
    //     h.id === habitId ? { ...h, [today]: !h[today] } : h
    //   );
    //   setHabits(updatedHabits);
    //   try {
    //     await patchHabits(habitId, { [today]: !habit[today] });
    //   } catch (e) {
    //     console.error(e);
    //     setHabits(habits);
    //   }
    // }
  };

  const handleLoad = async () => {
    const studyId = 10;
    const result = await getHabits(studyId);
    const checked = await Promise.all(
      result.map(async (habit) => {
        const habitDone = await getHabitDone(habit.id, today);
        return { habitId: habit.id, isDone: habitDone.isDone };
      })
    );

    setHabits(result);
    setHabitCheck(checked);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.habitList}>
      {habits.length === 0 ? (
        <p className={styles.noHabitText}>
          아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요{" "}
        </p>
      ) : (
        habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => HandleClick(habit.id)}
            className={
              habit[today] ? styles.habitChecked : styles.habitUnchecked
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
