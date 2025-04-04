import React, { useEffect, useState } from "react";
import styles from "@today-habit/Habits.module.css";
import { getHabitDone, putHabitDone } from "@api/today-habit/habitDone.api";
import { getHabits } from "@api/today-habit/habit.api";

function Habits({ studyId, isModalOpen, openModal, isLoading, setIsLoading }) {
  const [habits, setHabits] = useState([]);
  const [habitCheck, setHabitCheck] = useState(new Map());
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const handleClick = async (habitId) => {
    try {
      await putHabitDone(studyId, habitId, today);
      setHabitCheck((prev) => {
        const newCheck = new Map(prev);
        newCheck.set(habitId, !newCheck.get(habitId));
        return newCheck;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const result = await getHabits(studyId);
      const checked = new Map(
        await Promise.all(
          result.map(async (habit) => {
            const habitDone = await getHabitDone(studyId, habit.id, today);
            let isDone = false;
            if (habitDone) {
              isDone = true;
            }
            return [habit.id, isDone];
          })
        )
      );

      setHabits(result);
      setHabitCheck(checked);
    } catch (e) {
      console.error("데이터 로딩 에러", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      handleLoad();
    }
  }, [isModalOpen]);

  return (
    <div className={styles.habitContainer}>
      <div className={styles.habitTopContainer}>
        <p className={styles.habitTitle}>오늘의 습관</p>
        <button
          className={styles.listText}
          onClick={openModal} // 목록 수정 클릭 시 모달 열기
        >
          목록 수정
        </button>
      </div>
      <div className={styles.habitList}>
        {isLoading ? (
          <p className={styles.noHabitText}>로딩중...</p>
        ) : habits.length === 0 ? (
          <p className={styles.noHabitText}>
            아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요{" "}
          </p>
        ) : (
          habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => handleClick(habit.id)}
              className={
                habitCheck.get(habit.id)
                  ? styles.habitChecked
                  : styles.habitUnchecked
              }
            >
              {habit.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Habits;
