import HabitModal from "@today-habit/HabitModal";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "@today-habit/TodayHabit.module.css";
import Habits from "@today-habit/Habits";
import dayjs from "dayjs";
import StudyNavbar from "@components/study-navbar/StudyNavbar";
import { getHabits } from "../../api/today-habit/habit.api";

const TodayHabit = () => {
  const [currentTime, setCurrentTime] = useState(
    dayjs()
      .format("YYYY-MM-DD A HH:mm")
      .replace("AM", "오전")
      .replace("PM", "오후")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        dayjs()
          .format("YYYY-MM-DD A HH:mm")
          .replace("AM", "오전")
          .replace("PM", "오후"),
        1000
      );
      return () => clearInterval(interval);
    });
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const { id } = useParams();
  // const study = await getstudy(id)

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <StudyNavbar
            id={id}
            link={`/study/${id}/focus`}
            pageName={"오늘의 집중"}
          />
          <div className={styles.timeContainer}>
            <p className={styles.timeTitle}>현재 시간</p>
            <div className={styles.timeNow}>{currentTime}</div>
          </div>
        </div>
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
          <Habits studyId={id} />
        </div>
      </div>

      {/* 모달 열림 상태가 true일 때 TodayHabitCreate 모달 표시 */}
      {isModalOpen && (
        <div className={styles.modalBackground} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <HabitModal onClose={closeModal} studyId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayHabit;
