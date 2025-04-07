import React, { useState, useEffect } from "react";
import styles from "./PasswordModal.module.css";
import { useParams } from "react-router-dom";
import btnCloseIcon from "/images/icon/btn_visibility_on_24px-1.svg";
import btnSeeIcon from "/images/icon/btn_visibility_on_24px.svg";

const PasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  message = "권한이 필요해요!",
  actionButtonText,
  closeButtonText = "나가기",
  verifyPassword,
  customToastContainer = false,
}) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { studyId } = useParams();
  const [see, setSee] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setErrorMessage("");
      setShowErrorToast(false);
      setSee(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVisibilityToggle = () => {
    setSee((prevSee) => !prevSee);
  };

  const handleSubmit = async () => {
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
        onSuccess(password);
      } else {
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
          <div className={styles.passwordInputWrapper}>
            <input
              placeholder="비밀번호를 입력해 주세요"
              type={see ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
            />
            <img
              onClick={handleVisibilityToggle}
              className={styles.visibilityToggle}
              src={see ? btnSeeIcon : btnCloseIcon}
              alt="비밀번호 표시 전환"
            />
          </div>
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
