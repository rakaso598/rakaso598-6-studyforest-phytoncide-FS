import React, { useState } from "react";
import styles from "./StudyDetailNav.module.css";
import StudyEmoji from "./study-emoji/StudyEmoji";
import DeleteStudyModalButton from "@components/delete-study-modal/DeleteStudyModalButton";
import ShareModal from "./components/ShareModal";
import EditStudyModalButton from "./components/EditStudyModalButton";

function StudyDetailNav() {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.emojis}>
        <StudyEmoji />
      </div>

      <nav className={styles.nav}>
        <button
          type="button"
          className={styles.shareLink}
          onClick={() => setShareModalOpen(true)}
        >
          공유하기
        </button>
        <span className={styles.divider}>|</span>
        <EditStudyModalButton buttonText="수정하기" />
        <span className={styles.divider}>|</span>
        <DeleteStudyModalButton buttonText="스터디 삭제하기" />

        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
      </nav>
    </div>
  );
}

export default StudyDetailNav;
