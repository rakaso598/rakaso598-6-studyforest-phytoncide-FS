import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudy } from "@api/study/deleteStudy.api.js";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { verifyStudyPassword } from "@api/study/verifyPassword.api";
import PasswordModalButton from "@components/password-modal/PasswordModalButton";
import styles from "./TodayHabitButton.module.css";

const TodayFocusButton = ({ buttonText }) => {
  const [studyTitle, setStudyTitle] = useState("");
  const navigate = useNavigate();
  const { studyId } = useParams();
  const handleTodayHabit = () => {
    navigate(`/studies/${studyId}/habit`);
  };

  useEffect(() => {
    const fetchStudyTitle = async () => {
      try {
        const study = await getStudyDetail(studyId);
        setStudyTitle(study.title);
      } catch (error) {
        console.error("스터디 정보 가져오기 실패:", error);
      }
    };

    if (studyId) {
      fetchStudyTitle();
    }
  }, [studyId]);

  return (
    <>
      <PasswordModalButton
        buttonText={buttonText}
        buttonClassName={styles.todayHabitButton}
        modalTitle={studyTitle}
        modalMessage="권한이 필요해요!"
        actionButtonText="오늘의 습관으로 가기"
        closeButtonText="나가기"
        onSuccess={handleTodayHabit}
        verifyPassword={verifyStudyPassword}
      ></PasswordModalButton>
    </>
  );
};
export default TodayFocusButton;
