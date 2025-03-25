import React from 'react';

const EditStudyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>모달 제목</h2>
        <p>모달 내용</p>
        <button type="button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default EditStudyModal;