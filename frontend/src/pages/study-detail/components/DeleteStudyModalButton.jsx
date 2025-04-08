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

  const handleDeleteSuccess = async (password) => {
    try {
      const deleteResponse = await deleteStudy(studyId, password);

      if (deleteResponse && deleteResponse.success) {
        setShowSuccessToast(true);

        const storedData = localStorage.getItem("studyForestCardIds");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const updatedData = parsedData.filter(
            (study) => study.id != parseInt(studyId)
          );
          localStorage.setItem(
            "studyForestCardIds",
            JSON.stringify(updatedData)
          );
        }
        console.log("ignore");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("스터디 삭제 중 오류:", error);
    }
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
        buttonClassName={styles.deleteStudyModalButton}
        modalTitle={studyTitle}
        modalMessage="권한이 필요해요!"
        actionButtonText="삭제하기"
        closeButtonText="나가기"
        onSuccess={handleDeleteSuccess}
        verifyPassword={verifyStudyPassword}
      />

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
