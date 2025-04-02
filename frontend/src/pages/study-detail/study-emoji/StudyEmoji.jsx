import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from "./StudyEmoji.module.css";
import smileIcon from "/images/icon/ic_smile.svg";
import EmojiPicker from 'emoji-picker-react';
import axiosInstance from '../../../api/axiosInstance';
import { useParams } from 'react-router-dom';

function StudyEmoji() {
  const { id } = useParams();
  const [showPicker, setShowPicker] = useState(false);
  const addButtonRef = useRef(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const moreEmojisButtonRef = useRef(null);

  const handleAddButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmojis([...selectedEmojis, { emoji: emojiObject.emoji, id: Date.now() + Math.random() }]);
    setShowPicker(false);
  };

  const handleSelectedEmojiClick = (emojiToRemoveId) => {
    setSelectedEmojis(selectedEmojis.filter(item => item.id !== emojiToRemoveId));
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
    selectedEmojis.forEach(item => {
      emojiCounts[item.emoji] = (emojiCounts[item.emoji] || 0) + 1;
    });
    return emojiCounts;
  }, [selectedEmojis]);

  const getDisplayedEmojis = () => {
    const emojiCounts = getEmojiCounts();
    return Object.entries(emojiCounts)
      .sort(([, countA], [, countB]) => countB - countA) // 개수 순으로 정렬
      .slice(0, 3)
      .map(([emoji, count]) => ({ emoji, count }));
  };

  const getRemainingEmojis = () => {
    const allEmojis = getEmojiCounts();
    const displayedEmojis = getDisplayedEmojis().map(item => item.emoji);
    const remainingEmojis = {};

    for (const emoji in allEmojis) {
      if (!displayedEmojis.includes(emoji)) {
        remainingEmojis[emoji] = allEmojis[emoji];
      }
    }
    return Object.entries(remainingEmojis);
  };

  useEffect(() => {
    if (modalOpen && Object.keys(getEmojiCounts()).length <= 3) {
      setModalOpen(false);
    }
  }, [modalOpen, getEmojiCounts]);

  const sendEmojiData = useCallback(async () => {
    try {
      const emojiCounts = getEmojiCounts();
      const response = await axiosInstance.post(`/api/study/${id}/emojis`, {
        emojis: Object.entries(emojiCounts),
      });

      if (response.status === 200) {
        console.log('이모지 데이터가 성공적으로 업데이트되었습니다.');
      } else {
        console.error('이모지 데이터 업데이트 실패:', response.status);
      }
    } catch (error) {
      console.error('이모지 데이터 업데이트 중 오류 발생:', error);
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
  }, [getEmojiCounts, id]);

  useEffect(() => {
    if (selectedEmojis.length >= 0) {
      sendEmojiData();
    }
  }, [selectedEmojis, sendEmojiData]);

  return (
    <div className={styles.emojiContainer}>
      {getDisplayedEmojis().map((item, index) => (
        <button key={index} className={`${styles.commonButtonStyle} ${styles.emoji}`} onClick={() => {
          const firstOccurrence = selectedEmojis.find(se => se.emoji === item.emoji);
          if (firstOccurrence) {
            handleSelectedEmojiClick(firstOccurrence.id);
          }
        }}>
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
          <p>더 많은 이모지:</p>
          {getRemainingEmojis().map(([emoji, count]) => (
            <button key={emoji} className={`${styles.commonButtonStyle} ${styles.emoji}`} onClick={() => {
              const firstOccurrence = selectedEmojis.find(se => se.emoji === emoji);
              if (firstOccurrence) {
                handleSelectedEmojiClick(firstOccurrence.id);
              }
            }}>
              {emoji} {count > 0 && <span>{count}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyEmoji;