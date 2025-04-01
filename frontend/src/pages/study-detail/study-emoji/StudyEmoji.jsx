import React, { useState, useRef } from 'react';
import styles from "./StudyDetailNav.module.css";
import smileIcon from "/images/icon/ic_smile.svg";
import EmojiPicker from 'emoji-picker-react';

function StudyEmoji() {
  const [showPicker, setShowPicker] = useState(false);
  const addButtonRef = useRef(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const moreEmojisButtonRef = useRef(null);

  const handleAddButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmojis([...selectedEmojis, emojiObject.emoji]);
    setShowPicker(false);
  };

  const handleSelectedEmojiClick = (index) => {
    const newEmojis = [...selectedEmojis];
    newEmojis.splice(index, 1);
    setSelectedEmojis(newEmojis);
  };

  const handleMoreEmojisClick = () => {
    setModalOpen(!modalOpen); // 토글 기능 구현
  };

  const pickerStyle = {
    position: 'absolute',
    top: addButtonRef.current ? addButtonRef.current.offsetHeight + 10 : '50px',
    left: addButtonRef.current ? addButtonRef.current.offsetLeft : '0',
    zIndex: 1000,
  };

  const modalStyle = {
    position: 'absolute',
    top: moreEmojisButtonRef.current ? moreEmojisButtonRef.current.offsetHeight + moreEmojisButtonRef.current.offsetTop : 'auto',
    left: moreEmojisButtonRef.current ? moreEmojisButtonRef.current.offsetLeft : 'auto',
    background: 'white',
    padding: '20px',
    border: '1px solid gray',
    zIndex: 1001,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      {selectedEmojis.slice(0, 3).map((emoji, index) => (
        <button key={index} className={styles.emoji} onClick={() => handleSelectedEmojiClick(index)}>
          {emoji}
        </button>
      ))}

      {selectedEmojis.length > 3 && (
        <button ref={moreEmojisButtonRef} className={styles.emoji} onClick={handleMoreEmojisClick}>
          +{selectedEmojis.length - 3}
        </button>
      )}

      {Array(selectedEmojis.length >= 3 ? 1 : 3 - selectedEmojis.length).fill(null).map((_, index) => (
        <button key={`empty-${index}`} className={styles.emoji}>
          {/* 빈칸 */}
        </button>
      ))}

      <button className={styles.addBtn} onClick={handleAddButtonClick} ref={addButtonRef}>
        <img src={smileIcon} alt="smile" />
        <p>추가</p>
      </button>

      {showPicker && (
        <div style={pickerStyle}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {modalOpen && (
        <div style={modalStyle}>
          <p>선택된 이모지:</p>
          {selectedEmojis.map((emoji, index) => (
            <p key={index}>{emoji}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyEmoji;