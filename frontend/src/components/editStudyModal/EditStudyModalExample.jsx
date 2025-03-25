import React from 'react';
import EditStudyModalButton from './EditStudyModalButton';

const EditStudyModalExample = () => {
  return (
    <div>
      {/* 기본 버튼 텍스트를 사용하는 경우 */}
      <EditStudyModalButton />

      {/* 사용자 정의 버튼 텍스트를 사용하는 경우 */}
      <EditStudyModalButton buttonText="스터디 정보 수정" />

      {/* 다른 버튼들과 함께 사용하는 경우 */}
      <button>다른 버튼</button>
      <EditStudyModalButton buttonText="수정 모달 열기" />
    </div>
  );
};

export default EditStudyModalExample;