import React, { useState } from "react";
import styles from "./Input.module.css";

const NicknameInput = ({ nickName, setNickName }) => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    setNickName(e.target.value);

    if (e.target.value.length > 10) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <span>
      <label className={styles.label}>
        <p className={styles.inputBoxTitle}>닉네임</p>
        <input
          value={nickName}
          onChange={handleChange}
          className={`${styles.input} ${isActive && styles.err}`}
          type="text"
          placeholder="닉네임을 입력해 주세요"
        />
      </label>
      {isActive && (
        <p className={styles.errMessage}>*10자 이하로 적어주세요.</p>
      )}
    </span>
  );
};

export default NicknameInput;
