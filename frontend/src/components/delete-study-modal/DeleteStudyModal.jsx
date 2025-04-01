import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteStudyModal.module.css";
import axiosInstance from "@api/axiosInstance";
import SERVER_URL from "../../server";
import { deleteStudy } from "@api/study/deleteStudy.api.js";

const DeleteStudyModal = ({ isOpen, onClose }) => {
  const [encryptedPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const VERIFY_PASSWORD_URL = `${SERVER_URL}/api/study/verify-password`;
  const navigate = useNavigate();
  const { id } = useParams();

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerifyPassword = async () => {
    if (!encryptedPassword) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 1. 비밀번호 검증 단계
      const verifyResponse = await axiosInstance.post(VERIFY_PASSWORD_URL, {
        id: id,
        encryptedPassword,
      });

      // 2. 비밀번호 검증 성공 시 삭제 단계 진행
      if (verifyResponse.data.success) {
        try {
          // 3. 여기서 deleteStudy API 함수 활용
          const deleteResponse = await deleteStudy(id, encryptedPassword);

          if (deleteResponse && deleteResponse.success) {
            console.log("삭제되었습니다");
            navigate("/"); // 삭제 성공 시 홈으로 이동
          } else {
            setErrorMessage("스터디 삭제에 실패했습니다.");
          }
        } catch (deleteError) {
          console.error("스터디 삭제 중 오류:", deleteError);
          setErrorMessage("스터디 삭제 중 오류가 발생했습니다.");
        }
      } else {
        setErrorMessage("비밀번호 검증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 검증 API 호출 실패:", error);
      setErrorMessage("비밀번호 검증에 실패했습니다. 다시 시도해주세요.");
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
            value={encryptedPassword}
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
          onClick={handleVerifyPassword}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteStudyModal;
