import React, { useState, useRef, useEffect } from 'react';
import styles from "./StudyDetailNav.module.css";
import smileIcon from "/images/icon/ic_smile.svg";
import EmojiPicker from 'emoji-picker-react';

function StudyEmoji() {
  const [showPicker, setShowPicker] = useState(false);
  const addButtonRef = useRef(null);

  const handleAddButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const pickerStyle = {
    position: 'absolute',
    top: addButtonRef.current ? addButtonRef.current.offsetHeight + 10 : '50px',
    left: addButtonRef.current ? addButtonRef.current.offsetLeft : '0',
    zIndex: 1000,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}> {/* marginLeft 추가 */}
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
      <button className={styles.addBtn} onClick={handleAddButtonClick} ref={addButtonRef}>
        <img src={smileIcon} alt="smile" />
        <p>추가</p>
      </button>
      {showPicker && <div style={pickerStyle}><EmojiPicker /></div>}
    </div>
  );
}

export default StudyEmoji;