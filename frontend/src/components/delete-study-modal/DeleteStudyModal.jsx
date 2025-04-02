import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteStudyModal.module.css";
import { deleteStudy } from "@api/study/deleteStudy.api.js";

const DeleteStudyModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteStudy = async () => {
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 삭제 프론트 API 함수 호출 - 백엔드 스터디 삭제 API 에서 비밀번호 검증도 함께 수행됨
      const deleteResponse = await deleteStudy(id, password);

      if (deleteResponse && deleteResponse.success) {
        console.log("스터디가 성공적으로 삭제되었습니다");
        alert("스터디가 성공적으로 삭제되었습니다");
        navigate("/"); // 삭제 성공 시 공부의 숲 홈으로 이동
      } else {
        setErrorMessage(
          deleteResponse?.message || "스터디 삭제에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("스터디 삭제 중 오류:", error);
      const errorMsg = error.response?.data?.message;
      setErrorMessage(errorMsg || "스터디 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>스터디 삭제</p>
          <button
            type="button"
            onClick={onClose}
            className={styles.modalCloseButton}
          >
            나가기
          </button>
        </div>
        <p className={styles.modalMessage}>권한이 필요해요!</p>
        <div className={styles.modalInputContainer}>
          <p className={styles.modalInputLabel}>비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.modalInput}
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
        <button
          className={`${styles.modalVerifyButton} ${styles.deleteButton}`}
          type="button"
          onClick={handleDeleteStudy}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteStudyModal;
