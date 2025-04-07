import React, { useState, useRef, useEffect } from 'react';
import styles from "./StudyEmoji.module.css";
import EmojiPicker from 'emoji-picker-react';
import smileIcon from "/images/icon/ic_smile.svg";
import plusIcon from "/images/icon/ic_plus-1.svg";
import axiosInstance from '../../../api/axiosInstance';
import { useParams } from 'react-router-dom';

function StudyEmoji() {
  const { studyId } = useParams();
  const [showPicker, setShowPicker] = useState(false);
  const addButtonRef = useRef(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const moreEmojisButtonRef = useRef(null);
  const modalRef = useRef(null); // 모달 ref 추가
  const pickerRef = useRef(null); // 피커 ref 추가
  const isInitialLoad = useRef(true);
  const hasEmojiChanged = useRef(false);
  const isModalClosing = useRef(false); // 모달이 닫히는 중인지 추적

  useEffect(() => {
    const fetchInitialEmojis = async () => {
      try {
        const response = await axiosInstance.get(`/studies/${studyId}/emojis`);
        if (response.status === 200) {
          const initialEmojis = response.data.flatMap(item =>
            Array(item.count).fill(item.emojiContent).map((emoji) => ({
              emoji,
              id: Date.now() + Math.random(),
            }))
          );
          setSelectedEmojis(initialEmojis);
        } else {
          console.error('초기 이모지 데이터 불러오기 실패:', response.status);
        }
      } catch (error) {
        console.error('초기 이모지 데이터 불러오기 중 오류 발생:', error);
      } finally {
        isInitialLoad.current = false;
      }
    };

    fetchInitialEmojis();
  }, [studyId]);

  const handleAddButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmojis((prevEmojis) => {
      hasEmojiChanged.current = true; // 이모지가 추가됨을 표시
      return [
        ...prevEmojis,
        { emoji: emojiObject.emoji, id: Date.now() + Math.random() },
      ];
    });
    setShowPicker(false);
  };

  const handleSelectedEmojiClick = (emojiToRemove) => {
    setSelectedEmojis((prevEmojis) => {
      const indexToRemove = prevEmojis.findIndex(
        (item) => item.emoji === emojiToRemove.emoji
      );
      if (indexToRemove !== -1) {
        hasEmojiChanged.current = true;
        const newEmojis = [...prevEmojis];
        newEmojis.splice(indexToRemove, 1);
        return newEmojis;
      }
      return prevEmojis;
    });
  };

  const handleMoreEmojisClick = () => {
    if (!isModalClosing.current) {
      setModalOpen(!modalOpen);
    }
  };

  const getEmojiCounts = () => {
    return selectedEmojis.reduce((acc, curr) => {
      acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
      return acc;
    }, {});
  };

  const emojiCounts = getEmojiCounts();
  const displayedEmojis = Object.entries(emojiCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([emoji, count]) => ({ emoji, count }));

  const remainingEmojis = Object.entries(emojiCounts).filter(
    ([emoji]) => !displayedEmojis.map((item) => item.emoji).includes(emoji)
  );

  useEffect(() => {
    if (modalOpen && Object.keys(emojiCounts).length <= 3) {
      setModalOpen(false);
    }
  }, [modalOpen, emojiCounts]);

  const sendEmojiData = async () => {
    try {
      const response = await axiosInstance.post(`/studies/${studyId}/emojis`, {
        studyId: studyId,
        emojis: Object.entries(emojiCounts),
      });

      if (response.status === 200) {
        console.log('이모지 데이터가 성공적으로 업데이트되었습니다.');
      } else {
        console.error('이모지 데이터 업데이트 실패:', response.status);
      }
    } catch (error) {
      console.error('이모지 데이터 업데이트 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!isInitialLoad.current && hasEmojiChanged.current) {
      sendEmojiData();
      hasEmojiChanged.current = false;
    }
  }, [selectedEmojis, sendEmojiData]);

  // 모달 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        isModalClosing.current = true; // 닫기 시작
        setModalOpen(false);
        setTimeout(() => {
          isModalClosing.current = false; // 닫기 완료
        }, 250); // 적절한 시간 (애니메이션 시간 등) 설정
      }
    };

    const handleModalClick = (event) => {
      // 모달 내부 클릭은 무시
      if (modalOpen && modalRef.current && modalRef.current.contains(event.target)) {
        event.stopPropagation();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('click', handleModalClick); // 모달 내부 클릭 방지
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleModalClick);
    };
  }, [modalOpen]);

  // 이모지 피커 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutsidePicker = (event) => {
      if (showPicker && pickerRef.current && !pickerRef.current.contains(event.target) && addButtonRef.current !== event.target && !addButtonRef.current?.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutsidePicker);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePicker);
    };
  }, [showPicker]);

  return (
    <div className={styles.emojiContainer} ref={pickerRef}> {/* 피커 ref를 감싸는 div에 적용 */}
      {displayedEmojis.map((item, index) => (
        <button
          key={index}
          className={`${styles.commonButtonStyle} ${styles.emoji}`}
          onClick={() => handleSelectedEmojiClick(item)}
        >
          {item.emoji} {item.count > 0 && <span>{item.count}</span>}
        </button>
      ))}

      {Object.keys(emojiCounts).length > 3 && (
        <button
          ref={moreEmojisButtonRef}
          className={`${styles.moreEmojiButtonStyle} ${styles.emoji}`}
          onClick={handleMoreEmojisClick}
        >
          <img src={plusIcon} alt="더보기" /> {Object.keys(emojiCounts).length - 3}..
        </button>
      )}

      <button
        className={`${styles.addBtn} ${styles.addEmojiButtonStyle}`}
        onClick={handleAddButtonClick}
        ref={addButtonRef}
      >
        <img src={smileIcon} alt="smile" />
        <p>추가</p>
      </button>

      {showPicker && (
        <div className={styles.emojiPickerContainer}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {modalOpen && (
        <div className={styles.moreEmojisModal} ref={modalRef}> {/* 모달 ref 적용 */}
          {remainingEmojis.map(([emoji, count]) => (
            <button
              key={emoji}
              className={`${styles.commonButtonStyle} ${styles.emoji}`}
              onClick={() => handleSelectedEmojiClick({ emoji })}
            >
              {emoji} {count > 0 && <span>{count}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyEmoji;