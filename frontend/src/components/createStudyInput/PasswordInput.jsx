import React, { useState } from "react";
import styles from "./PasswordInput.module.css";
import btnCloseIcon from "/images/icon/btn_visibility_on_24px-1.svg";
import btnSeeIcon from "/images/icon/btn_visibility_on_24px.svg";

const PasswordInput = ({ setEncryptedPassword }) => {
  const [see, setSee] = useState(false);

  const handleClick = () => {
    if (see) {
      setSee(false);
    } else {
      setSee(true);
    }
  };

  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>비밀번호</p>
      <div className={styles.pwInputBox}>
        <input
          onChange={(e) => setEncryptedPassword(e.target.value)}
          className={styles.input}
          type={see ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
        />
        <img
          onClick={handleClick}
          className={styles.btnIcon}
          src={see ? btnSeeIcon : btnCloseIcon}
          alt="btnSeeIcon"
        />
      </div>
    </label>
  );
};

export default PasswordInput;
