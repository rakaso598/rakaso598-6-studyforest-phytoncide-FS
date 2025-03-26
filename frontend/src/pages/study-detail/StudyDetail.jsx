import React from "react";
import styles from "./StudyDetail.module.css";

const StudyDetail = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.topContainer}>
          <div className={styles.emojiContainer}>
            <img src="/images/stickers/Subtract-1.svg" alt="emoji" />
            <img src="/images/stickers/Subtract-2.svg" alt="emoji" />
            <img src="/images/stickers/Subtract-3.svg" alt="emoji" />
            <img src="/images/stickers/Subtract-4.svg" alt="emoji" />
          </div>
          <nav className={styles.nav}>
            {/* Link tag 로 나중에 변경할것 */}
            <a href="#">공유하기</a>
            <p>|</p>
            <a href="#">수정하기</a>
            <p>|</p>
            <a href="#">스터디 삭제하기</a>
          </nav>
        </div>

        <div className={styles.bottomContainer}>
          <div className={styles.titleSection}>
            <h1>지수의 개발공장</h1>
            <div className={styles.buttonContainer}>
              <button>오늘의 집중</button>
              <button>오늘의 습관</button>
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.introSection}>
              <h2>소개</h2>
              <p>오늘 하루도 화이팅</p>
            </div>

            <div className={styles.pointsSection}>
              <h2>현재까지 획득한 포인트</h2>
              <div>
                <img src="/images/icon/ic_point.svg" alt="point icon" />
                <p>310p 획득</p>
              </div>
            </div>

            <div className={styles.habitRecordTable}>
              {/* 습관 기록표 컴포넌트가 들어갈 자리 */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyDetail;
