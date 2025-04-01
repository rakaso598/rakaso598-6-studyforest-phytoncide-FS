import React, { useState, useEffect } from "react";
import styles from "@components/habit-modal/TodayHabitCreate.module.css";
import trashIcon from "/images/icon/ic_trash.svg";
import plusIcon from "/images/icon/ic_plus.svg";
import { getHabits } from "@api/today-habit/habit.api";

const TodayHabitCreate = ({ onClose }) => {
  //habits 설정
  const [habits, setHabits] = useState([]);

  const handleLoad = async () => {
    const studyId = 10;
    const result = await getHabits(studyId);

    setHabits(result);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleInputChange = (index, updatingHabit) => {
    setHabits((prev) =>
      prev.map((habit, idx) =>
        idx === index ? { ...habit, title: updatingHabit } : habit
      )
    );
  };

  //습관 추가
  const handleAddHabit = () => {
    setHabits([...habits, { id: Date.now(), title: "                   " }]); // ✅ 객체 형태로 추가
  };

  //습관 삭제 habits 필터링
  const handleDeleteHabit = (index) => {
    const updatedHabits = habits.filter((_, idx) => idx !== index);
    setHabits(updatedHabits);
  };

  return (
    <div className={styles.habitCreateModal}>
      <p className={styles.headline}>습관 목록</p>
      <div className={styles.wholeHabitsBox}>
        {habits.map((habit, index) => (
          <div className={styles.singleHabitBoxWithTrashIc} key={index}>
            <div className={styles.singleHabitBox}>
              <input
                type="text"
                className={styles.singleHabit}
                value={habit.title}
                onClick={() => {
                  if (habit.title === "                   ") {
                    handleInputChange(index, "");
                  }
                }}
                onChange={(e) => handleInputChange(index, e.target.value)} //map에서 주는 index
                size={habit.length || 10}
              />
            </div>
            <img
              src={trashIcon}
              className={styles.trashIcon}
              onClick={() => handleDeleteHabit(index)}
              alt="삭제 아이콘"
            />
          </div>
        ))}
        <div className={styles.createBox} onClick={handleAddHabit}>
          <img src={plusIcon} alt="추가 아이콘" />
        </div>
      </div>
      <div className={styles.btns}>
        <button className={styles.close} onClick={onClose}>
          취소
        </button>
        <button className={styles.confirmRevision}>수정 완료</button>
      </div>
    </div>
  );
};

export default TodayHabitCreate;
