import HabitModal from "@today-habit/HabitModal";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "@today-habit/TodayHabit.module.css";
import Habits from "@today-habit/Habits";
import StudyNavbar from "@components/study-navbar/StudyNavbar";
import CurrentTime from "@today-habit/CurrentTime";

const TodayHabit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const { studyId } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <StudyNavbar
            studyId={studyId}
            link={`/study/${studyId}/focus`}
            pageName={"오늘의 집중"}
          />
          <CurrentTime />
        </div>
        <Habits studyId={studyId} refresh={isModalOpen} openModal={openModal} />
      </div>

      {/* 모달 열림 상태가 true일 때 TodayHabitCreate 모달 표시 */}
      {isModalOpen && (
        <div className={styles.modalBackground} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <HabitModal onClose={closeModal} studyId={studyId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayHabit;
