import React from "react";
import styles from "./Input.module.css";

const NicknameInput = ({ setNickName }) => {
  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>닉네임</p>
      <input
        onChange={(e) => setNickName(e.target.value)}
        className={styles.input}
        type="text"
        placeholder="닉네임을 입력해 주세요"
      />
    </label>
  );
};

export default NicknameInput;
