import React, { useState, useEffect } from "react";
import styles from "@components/habit-modal/TodayHabitCreate.module.css";
import trashIcon from "/images/icon/ic_trash.svg";
import plusIcon from "/images/icon/ic_plus.svg";
import { getHabits } from "@api/today-habit/habit.api";

const TodayHabitCreate = ({ onClose }) => {
  //habits 설정
  const [habits, setHabits] = useState([]);
  console.log(habits);

  const handleLoad = async () => {
    const studyId = 10;
    const result = await getHabits(studyId);

    setHabits(result);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  //prev는 배열임
  const handleInputChange = (index, updatingHabit) => {
    setHabits((prev) =>
      prev.map((habit, idx) =>
        idx === index ? { ...habit, title: updatingHabit } : habit
      )
    );
  };
  //습관 추가
  const handleAddHabit = () => {
    setHabits([...habits, { id: Date.now(), title: "                   " }]);
  };

  //습관 삭제 habits 필터링
  const handleDeleteHabit = (index) => {
    const updatedHabits = habits.filter((_, idx) => idx !== index);
    setHabits(updatedHabits);
  };

  //수정 완료 시 변경 습관들 서버로
  const handleConfirmRevision = async () => {
    try {
      const studyId = 10;
      const result = await getHabits(studyId);

      // 1. 새로운 습관: habits에는 있고 result에는 없는 습관들
      const newHabits = habits.filter(
        (habit) => !result.some((rHabit) => rHabit.id === habit.id)
      );

      // 2. 수정된 습관: habits와 result에서 id는 같지만 title이 다른 습관들
      const updatedHabits = habits.filter((habit) => {
        const existingHabit = result.find((rHabit) => rHabit.id === habit.id);
        return existingHabit && existingHabit.title !== habit.title;
      });

      //3. 삭제 된 습관: result에는 있고 habits에는 없는 습관들
      const deletedHabits = result.filter(
        (result) => !habits.some((habit) => habit.id === result.id)
      );

      console.log("새로운 습관들:", newHabits);
      console.log("수정된 습관들:", updatedHabits);
      console.log("삭제한 습관들:", deletedHabits);

      await Promise.all([
        ...newHabits.map((newHabit) => postHabit(studyId, newHabit)), // 새 습관 추가
        ...updatedHabits.map(
          (
            { id, ...updatedHabit } //아이디 빼고 나머지를 보낼거임
          ) => patchHabits(id, updatedHabit)
        ), // 수정된 습관 업데이트
        ...deletedHabits.map((deletedHabit) => deleteHabit(deletedHabit.id)),
      ]);
      alert("습관 수정 완료");
    } catch (error) {
      alert("습관 수정 실패");
    }
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
        <button
          className={styles.confirmRevision}
          onClick={handleConfirmRevision}
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default TodayHabitCreate;
