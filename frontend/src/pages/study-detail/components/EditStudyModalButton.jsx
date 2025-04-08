import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { verifyStudyPassword } from "@api/study/verifyPassword.api";
import PasswordModalButton from "./password-modal/PasswordModalButton";
import styles from "./EditStudyModalButton.module.css";

const EditStudyModalButton = ({ buttonText }) => {
  const [studyTitle, setStudyTitle] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const { studyId } = useParams();

  const handleNavigateToEditForm = () => {
    navigate(`/studies/${studyId}/form`);
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
    <PasswordModalButton
      buttonText={buttonText}
      buttonClassName={styles.editStudyModalButton}
      modalTitle={studyTitle}
      nickName={nickName}
      modalMessage="권한이 필요해요!"
      actionButtonText="수정하러 가기"
      closeButtonText="나가기"
      onSuccess={handleNavigateToEditForm}
      verifyPassword={verifyStudyPassword}
    />
  );
};

export default EditStudyModalButton;
