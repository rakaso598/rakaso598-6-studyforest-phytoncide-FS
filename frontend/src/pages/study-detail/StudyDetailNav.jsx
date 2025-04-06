import React from "react";
import styles from "./StudyDetailNav.module.css";
import EditStudyModalButton from "@components/edit-study-modal/EditStudyModalButton";
import StudyEmoji from "./study-emoji/StudyEmoji";
import DeleteStudyModalButton from "@components/delete-study-modal/DeleteStudyModalButton";

function StudyDetailNav() {
  return (
    <div className={styles.header}>
      <div className={styles.emojis}>
        <StudyEmoji />
      </div>

      <nav className={styles.nav}>
        {/* 이부분 공유 모달 버튼 컴포넌트 만들어서 대체 예정 */}
        <button type="button" className={styles.shareLink}>
          공유하기
        </button>
        <span className={styles.divider}>|</span>
        <EditStudyModalButton
          buttonText="수정하기"
          className={styles.editLink}
        />
        <span className={styles.divider}>|</span>
        <DeleteStudyModalButton buttonText="스터디 삭제하기" />
      </nav>
    </div>
  );
}

export default StudyDetailNav;
