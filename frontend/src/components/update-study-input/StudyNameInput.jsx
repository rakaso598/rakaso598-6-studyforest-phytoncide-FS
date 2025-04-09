import React, { useState } from "react";
import styles from "./Input.module.css";

const StudyNameInput = ({ setStudyName, studyName }) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveLetters, setIsActiveLetters] = useState(false);

  const handleChange = (e) => {
    setStudyName(e.target.value);

    if (!e.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (e.target.value.length > 10) {
      setIsActiveLetters(true);
    } else {
      setIsActiveLetters(false);
    }
  };

  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>스터디 이름</p>
      <input
        onChange={handleChange}
        className={`${styles.input} ${isActive && styles.err} ${isActiveLetters && styles.err}`}
        type="text"
        placeholder="스터디 이름을 입력해주세요"
        value={studyName}
      />
      {isActive && (<p className={styles.errMessage}>*스터디 이름을 입력해주세요.</p>)}
      {isActiveLetters && (
        <p className={styles.errMessage}>*10글자 이하로 적어주세요.</p>
      )}
    </label>
  );
};

export default StudyNameInput;