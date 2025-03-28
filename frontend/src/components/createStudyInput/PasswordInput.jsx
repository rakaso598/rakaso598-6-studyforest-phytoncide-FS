import React from "react";
import styles from "./PasswordInput.module.css";
import btnCloseIcon from "/images/icon/btn_visibility_on_24px-1.svg";
import btnSeeIcon from "/images/icon/btn_visibility_on_24px.svg";

const PasswordInput = ({ setPassword }) => {
  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>비밀번호</p>
      <div className={styles.pwInputBox}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <img className={styles.btnIcon} src={btnCloseIcon} alt="btnSeeIcon" />
      </div>
    </label>
  );
};

export default PasswordInput;
