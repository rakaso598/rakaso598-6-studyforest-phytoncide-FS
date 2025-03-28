import React, { useState } from "react";
import styles from "./Input.module.css";

const StudyNameInput = ({ setStudyName }) => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    setStudyName(e.target.value);

    if (!e.target.value) {
      setIsActive(true);
    }
  };

  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>스터디 이름</p>
      <input
        onChange={handleChange}
        className={`${styles.input} ${isActive ? styles.err : ""}`}
        type="text"
        placeholder="스터디 이름을 입력해주세요"
      />
      {isActive && (
        <p className={styles.errMessage}>*스터디 이름을 입력해주세요.</p>
      )}
    </label>
  );
};

export default StudyNameInput;
