import React from 'react';
import './styles/global.css';

function App() {
  return (
    <div>
      <div>기본 폰트값은 프리텐다드 입니다</div>
      <hr />
      <div style={{ fontFamily: 'var(--font-pretendard-regular)' }}>
        Pretendard Regular (400)
      </div>
      <hr />
      <div style={{ fontFamily: 'var(--font-pretendard-medium)' }}>
        Pretendard Medium (500)
      </div>
      <hr />
      <div style={{ fontFamily: 'var(--font-pretendard-bold)' }}>
        Pretendard Bold (700)
      </div>
      <hr />

      <div style={{ fontFamily: 'var(--font-jejudoldam)' }}>제주 돌담체</div>
      <div
        style={{
          backgroundColor: 'var(--bg-green)',
          width: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jejudoldam)',
            fontSize: '18px',
            color: 'var(--text-white)',
          }}
        >
          스터디 만들기
        </span>
      </div>
    </div>
  );
}

export default App;
