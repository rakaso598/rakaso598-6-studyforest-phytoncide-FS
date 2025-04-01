import React from "react";
import styles from "./StudyDetailNav.module.css";
import EditStudyModalButton from "@components/edit-study-modal/EditStudyModalButton";
import StudyEmoji from "./study-emoji/StudyEmoji";
// import smileIcon from "/images/icon/ic_smile.svg";

function StudyDetailNav() {
  return (
    <div className={styles.header}>
      {/* 이부분 나중에 이모지 기능 연동하면 src 변경해야함 */}
      <div className={styles.emojis}>
        <StudyEmoji />
      </div>

      <nav className={styles.nav}>
        {/* 이부분 Link 달아서 변경해야함 */}
        <button type="button" className={styles.shareLink}>
          공유하기
        </button>
        <span className={styles.divider}>|</span>
        <EditStudyModalButton
          buttonText="수정하기"
          className={styles.editLink}
        />
        <span className={styles.divider}>|</span>
        <button type="button" className={styles.deleteLink}>
          스터디 삭제하기
        </button>
      </nav>
    </div>
  );
}

export default StudyDetailNav;
