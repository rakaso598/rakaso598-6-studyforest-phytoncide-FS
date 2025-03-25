import React from 'react';
import EditStudyModalButton from './EditStudyModalButton';

/**
 * 스터디 상세 - 비번 모달 (수정하러가기 버튼 존재) 기능을 사용하기 위한 예제 컴포넌트입니다.
 * 
 * import EditStudyModalExample from './components/editStudyModal/EditStudyModalExample';
 * <Route path='/edit-study-modal-example' element={<EditStudyModalExample />} />
 * 
 * 라우팅 시 App.jsx에 위 임포트와 라우트패스 코드 기입하면 동작 확인 가능합니다. (라우팅경로 언제든지 변경될수있음)
 */
const EditStudyModalExample = () => {
  return (
    <div>
      <EditStudyModalButton buttonText="스터디 정보 수정" />
    </div>
  );
};

export default EditStudyModalExample;