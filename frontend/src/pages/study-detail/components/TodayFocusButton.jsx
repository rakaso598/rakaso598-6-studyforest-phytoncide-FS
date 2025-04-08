import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudy } from "@api/study/deleteStudy.api.js";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { verifyStudyPassword } from "@api/study/verifyPassword.api";
import PasswordModalButton from "@components/password-modal/PasswordModalButton";
import styles from "./TodayFocusButton.module.css";

const TodayFocusButton = ({ buttonText }) => {
  const [studyTitle, setStudyTitle] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const { studyId } = useParams();
  const handleTodayFocus = () => {
    navigate(`/studies/${studyId}/focus`);
  };

  useEffect(() => {
    const fetchStudyTitle = async () => {
      try {
        const study = await getStudyDetail(studyId);
        setStudyTitle(study.title);
        setNickName(study.nickName);
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
        buttonClassName={styles.todayFocusButton}
        modalTitle={studyTitle}
        nickName={nickName}
        modalMessage="권한이 필요해요!"
        actionButtonText="오늘의 집중으로 가기"
        closeButtonText="나가기"
        onSuccess={handleTodayFocus}
        verifyPassword={verifyStudyPassword}
      ></PasswordModalButton>
    </>
  );
};
export default TodayFocusButton;
