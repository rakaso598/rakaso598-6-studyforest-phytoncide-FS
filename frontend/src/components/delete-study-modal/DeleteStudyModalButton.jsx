// src/components/delete-study-modal/DeleteStudyModalButton.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudy } from "@api/study/deleteStudy.api.js";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { verifyStudyPassword } from "@api/study/verifyPassword.api";
import PasswordModalButton from "@components/password-modal/PasswordModalButton";
import styles from "./DeleteStudyModalButton.module.css";

const DeleteStudyModalButton = ({ buttonText }) => {
  const [studyTitle, setStudyTitle] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();
  const { studyId } = useParams();

  // 비밀번호 검증 성공 후 스터디 삭제 처리
  const handleDeleteSuccess = async (password) => {
    try {
      const deleteResponse = await deleteStudy(studyId, password);

      if (deleteResponse && deleteResponse.success) {
        setShowSuccessToast(true);

        // 로컬 스토리지에서 삭제된 스터디 제거
        const storedData = localStorage.getItem("studyForest");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const updatedData = parsedData.filter(
            (study) => study.id != parseInt(studyId)
          );
          localStorage.setItem("studyForest", JSON.stringify(updatedData));
        }

        // 2초 후 홈으로 이동
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("스터디 삭제 중 오류:", error);
    }
  };

  // 스터디 제목 가져오기
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
        buttonClassName={styles.deleteStudyModalButton}
        modalTitle={studyTitle}
        modalMessage="권한이 필요해요!"
        actionButtonText="삭제하기"
        closeButtonText="나가기"
        onSuccess={handleDeleteSuccess}
        verifyPassword={verifyStudyPassword}
      />

      {/* 성공 토스트 메시지 */}
      {showSuccessToast && (
        <div className={styles.toastContainer}>
          <p className={styles.toastSuccess}>
            🎉 스터디가 성공적으로 삭제되었습니다
          </p>
        </div>
      )}
    </>
  );
};

export default DeleteStudyModalButton;
