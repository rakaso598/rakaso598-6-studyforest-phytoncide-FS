import React from 'react'
import styles from "./StudyDetailNav.module.css";
import smileIcon from "/images/icon/ic_smile.svg";

function StudyEmoji() {
  return (
    <div>
      <button className={styles.emoji}>
        <img src="/images/stickers/Subtract-1.svg" alt="emoji" />
      </button>
      <button className={styles.emoji}>
        <img src="/images/stickers/Subtract-2.svg" alt="emoji" />
      </button>
      <button className={styles.emoji}>
        <img src="/images/stickers/Subtract-3.svg" alt="emoji" />
      </button>
      <button className={styles.emoji}>
        <img src="/images/stickers/Subtract-4.svg" alt="emoji" />
      </button>
      <button className={styles.addBtn}>
        <img src={smileIcon} />
        <p>추가</p>
      </button>

    </div>
  )
}

export default StudyEmoji