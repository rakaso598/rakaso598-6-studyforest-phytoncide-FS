import React, { useState } from 'react';
import './EditStudyModal.css';

const EditStudyModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const VERIFY_PASSWORD_URL = "http://localhost:5090/api/verify-password";

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleVerifyPassword = async () => {
    try {
      // 백엔드로 요청
      const response = await fetch(VERIFY_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      // 백엔드에서 응답
      if (!response.ok) {
        throw new Error('서버 응답 실패!') // 서버의 응답이 ok가 아닐 때
      }

      const data = await response.json(); // 응답을 json으로 파싱
      console.log(data); // 응답을 콘솔로그

      /// 백엔드에서 { success : true } 또는 false 를 포함해서 넣어줘야함. 비밀번호 검증이 성공했는지 실패했는지.
      if (data.success) {
        // 성공시 비밀번호 수정 화면으로 이동하면 됨. 라우팅되있으면 이동합시다.
      } else {
        // 실패시 비밀번호 검증에 실패했다는 문구를 보여줘야함.
      }

    } catch (error) {
      console.error('비밀번호 검증 API 호출 실패!:', error)
      setErrorMessage('비밀번호 검증에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">연우의 개발공장</p>
          <button type="button" onClick={onClose} className="modal-close-button">
            나가기
          </button>
        </div>
        <p className="modal-message">권한이 필요해요!</p>
        <div className="modal-input-container">
          <p className="modal-input-label">비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="modal-input"
          />
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