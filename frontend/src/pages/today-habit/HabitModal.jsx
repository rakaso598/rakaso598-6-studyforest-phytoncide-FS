import React, { useState, useEffect } from "react";
import styles from "@today-habit/HabitModal.module.css";
import trashIcon from "/images/icon/ic_trash.svg";
import plusIcon from "/images/icon/ic_plus.svg";
import { putHabits, getHabits } from "@api/today-habit/habit.api";

const HabitModal = ({ onClose, studyId }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const handleLoad = async () => {
      const result = await getHabits(studyId);
      setHabits(result);
    };
    handleLoad();
  }, [studyId]);

  const handleInputChange = (index, updatingHabit) => {
    setHabits((prev) =>
      prev.map((habit, idx) =>
        idx === index ? { ...habit, title: updatingHabit } : habit
      )
    );
  };
  const handleAddHabit = () => {
    setHabits((prev) => [
      ...prev,
      { id: Date.now(), title: "                   ", isDone: false },
    ]);
  };
  const handleDeleteHabit = (habitToDelete) => {
    setHabits((prev) =>
      prev
        .map((habit) =>
          habit.id === habitToDelete.id ? { ...habit, isDone: true } : habit
        )
        .filter((habit) => !habit.isDone)
    );
  };
  const handleConfirmRevision = async () => {
    try {
      await putHabits(studyId, habits);
      alert("습관 수정 완료");

      onClose();
    } catch (error) {
      alert("습관 수정 실패");
    }
  };

  return (
    <div className={styles.habitCreateModal}>
      <p className={styles.headline}>습관 목록</p>
      <div className={styles.wholeHabitsBox}>
        {habits.map((habit, index) => (
          <div className={styles.singleHabitBoxWithTrashIc} key={habit.id}>
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
                onChange={(e) => handleInputChange(index, e.target.value)}
                size={habit.title.length || 10}
              />
            </div>
            <img
              src={trashIcon}
              className={styles.trashIcon}
              onClick={() => handleDeleteHabit(habit)}
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
        <button
          className={styles.confirmRevision}
          onClick={() => {
            handleConfirmRevision();
            onClose();
          }}
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default HabitModal;
