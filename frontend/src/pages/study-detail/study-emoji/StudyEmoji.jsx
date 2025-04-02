import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from "./StudyEmoji.module.css";
import smileIcon from "/images/icon/ic_smile.svg";
import EmojiPicker from 'emoji-picker-react';
import axiosInstance from '../../../api/axiosInstance';
import { useParams } from 'react-router-dom'; // useParams 훅 import

function StudyEmoji() { // studyId prop 제거
  const { id } = useParams(); // URL 파라미터로부터 id 추출
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

  const handleSelectedEmojiClick = (emojiToRemove) => {
    setSelectedEmojis(selectedEmojis.filter(emoji => emoji !== emojiToRemove));
  };

  const handleMoreEmojisClick = () => {
    setModalOpen(!modalOpen);
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
    background: 'white',
    padding: '20px',
    border: '1px solid gray',
    zIndex: 1001,
  };

  const getEmojiCounts = useCallback(() => {
    const emojiCounts = {};
    selectedEmojis.forEach((emoji) => {
      emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
    });
    return emojiCounts;
  }, [selectedEmojis]);

  const getDisplayedEmojis = () => {
    const emojiCounts = getEmojiCounts();
    return Object.entries(emojiCounts).slice(0, 3).map(([emoji, count]) => ({
      emoji,
      count,
    }));
  };

  useEffect(() => {
    if (modalOpen && Object.keys(getEmojiCounts()).length <= 3) {
      setModalOpen(false);
    }
  }, [modalOpen, getEmojiCounts]);

  const sendEmojiData = async () => {
    try {
      const emojiCounts = getEmojiCounts();
      const response = await axiosInstance.post(`/api/study/${id}/emojis`, {
        emojis: Object.entries(emojiCounts),
      });

      if (response.status === 200) {
        console.log('이모지 데이터가 성공적으로 전송되었습니다.');
      } else {
        console.error('이모지 데이터 전송 실패:', response.status);
      }
    } catch (error) {
      console.error('이모지 데이터 전송 중 오류 발생:', error);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
        console.error('상태 코드:', error.response.status);
        console.error('헤더:', error.response.headers);
      } else if (error.request) {
        console.error('요청 오류:', error.request);
      } else {
        console.error('Axios 오류:', error.message);
      }
    }
  };

  const handleSaveEmojis = () => {
    sendEmojiData();
  };

  return (
    <div className={styles.emojiContainer}>
      {getDisplayedEmojis().map((item, index) => (
        <button key={index} className={`${styles.commonButtonStyle} ${styles.emoji}`} onClick={() => handleSelectedEmojiClick(item.emoji)}>
          {item.emoji} {item.count > 0 && <span>{item.count}</span>}
        </button>
      ))}

      {Object.keys(getEmojiCounts()).length > 3 && (
        <button ref={moreEmojisButtonRef} className={`${styles.moreEmojiButtonStyle} ${styles.emoji}`} onClick={handleMoreEmojisClick}>
          + {Object.keys(getEmojiCounts()).length - 3}..
        </button>
      )}

      <button className={`${styles.addBtn} ${styles.addEmojiButtonStyle}`} onClick={handleAddButtonClick} ref={addButtonRef}>
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
          {Object.entries(getEmojiCounts()).map(([emoji, count]) => (
            <button key={emoji} className={`${styles.commonButtonStyle} ${styles.emoji}`} onClick={() => handleSelectedEmojiClick(emoji)}>
              {emoji} {count}
            </button>
          ))}
        </div>
      )}

      <button onClick={handleSaveEmojis}>이모지 저장</button>
    </div>
  );
}

export default StudyEmoji;