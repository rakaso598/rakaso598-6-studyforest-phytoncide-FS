import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStudyModal.css";
import axiosInstance from "../../api/axiosInstance";

const EditStudyModal = ({ isOpen, onClose }) => {
  const [encryptedPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { studyId } = useParams();

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const VERIFY_PASSWORD_URL = `https://six-study-forest-server.onrender.com/studies/${studyId}/verify-password`;
  const VERIFY_PASSWORD_URL = `https://six-study-forest-server.onrender.com/studies/${studyId}/verify-password`;
  const handleVerifyPassword = async () => {
    try {
      const response = await axiosInstance.post(VERIFY_PASSWORD_URL, {
        studyId: studyId,
        encryptedPassword,
      });

      console.log(response.data);

      if (response.data.success) {
        navigate(`/studies/${studyId}/form`);
      } else {
        setErrorMessage("비밀번호 검증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 검증 API 호출 실패!:", error);
      setErrorMessage("비밀번호 검증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">연우의 개발공장</p>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            나가기
          </button>
        </div>
        <p className="modal-message">권한이 필요해요!</p>
        <div className="modal-input-container">
          <p className="modal-input-label">비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={encryptedPassword}
            onChange={handlePasswordChange}
            className="modal-input"
          />
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
        <button
          className="modal-verify-button"
          type="button"
          onClick={handleVerifyPassword}
        >
          수정하러 가기
        </button>
      </div>
    </div>
  );
};

export default EditStudyModal;