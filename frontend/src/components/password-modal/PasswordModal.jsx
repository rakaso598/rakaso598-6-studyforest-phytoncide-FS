// src/components/common/password-modal/PasswordModal.jsx
import React, { useState, useEffect } from "react";
import styles from "./PasswordModal.module.css";
import { useParams } from "react-router-dom";

const PasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  message = "권한이 필요해요!",
  actionButtonText,
  closeButtonText = "나가기",
  verifyPassword,
  customToastContainer = false, // 커스텀 토스트 컨테이너 사용 여부
}) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { studyId } = useParams();

  // 모달이 열릴 때 폼 리셋
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setErrorMessage("");
      setShowErrorToast(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    // 비밀번호 미입력 검사
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      return;
    }

    try {
      // 비밀번호 검증 함수 호출 (props로 받은 함수)
      const result = await verifyPassword(studyId, password);

      if (result.success) {
        // 성공 시 콜백 함수 호출
        onSuccess(password);
      } else {
        // 실패 시 에러 메시지 표시
        setErrorMessage(result.message || "비밀번호가 일치하지 않습니다.");
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      }
    } catch (error) {
      console.error("비밀번호 확인 중 오류:", error);
      setErrorMessage("비밀번호 확인 중 오류가 발생했습니다.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            {closeButtonText}
          </button>
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
          {!customToastContainer && (
            <p
              className={`${styles.toastError} ${
                showErrorToast && styles.show
              }`}
            >
              🚨 {errorMessage || "비밀번호가 일치하지 않습니다."}
            </p>
          )}
        </div>
        <button
          className={styles.actionButton}
          type="button"
          onClick={handleSubmit}
        >
          {actionButtonText}
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
