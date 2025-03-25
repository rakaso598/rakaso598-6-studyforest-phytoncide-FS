import React from 'react';
import './EditStudyModal.css';

const EditStudyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div>
          <p>연우의 개발공장<button type="button" onClick={onClose}>나가기</button></p>
        </div>
        <p>권한이 필요해요!</p>
        <div>
          <p>비밀번호</p>
          <input placeholder='비밀번호를 입력해 주세요' />
        </div>
        <button>수정하러 가기</button>
      </div>
    </div>
  );
};

export default EditStudyModal; 