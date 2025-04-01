import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteStudyModal.css";
import { deleteStudy } from "../../api/study/studyDelete.api";

const DeleteStudyModal = ({ isOpen, onClose }) => {
  const [encryptedPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDelete = async () => {
    if (!encryptedPassword) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await deleteStudy(id, encryptedPassword);
      console.log("삭제되었습니다");
      navigate("/"); // 삭제 성공 시 홈으로 이동
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("비밀번호가 일치하지 않습니다.");
        } else if (error.response.status === 404) {
          setErrorMessage("스터디를 찾을 수 없습니다.");
        } else {
          setErrorMessage("스터디 삭제 중 오류가 발생했습니다.");
        }
      } else {
        setErrorMessage("서버 연결 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">스터디 삭제</p>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button
          className="modal-verify-button delete-button"
          type="button"
          onClick={handleDelete}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteStudyModal;
