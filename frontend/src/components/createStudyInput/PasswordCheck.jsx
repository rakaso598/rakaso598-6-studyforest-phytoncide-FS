import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import btnCloseIcon from "/images/icon/btn_visibility_on_24px-1.svg";
import btnSeeIcon from "/images/icon/btn_visibility_on_24px.svg";

const PasswordCheck = ({
  encryptedPassword,
  setPasswordCheck,
  passwordCheck,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [see, setSee] = useState(false);

  const handleClick = () => {
    if (see) {
      setSee(false);
    } else {
      setSee(true);
    }
  };

  useEffect(() => {
    if (passwordCheck === "") {
      setIsActive(false);
    } else {
      setIsActive(encryptedPassword !== passwordCheck);
    }
  }, [encryptedPassword, passwordCheck]);

  return (
    <span>
      <label className={styles.label}>
        <p className={styles.inputBoxTitle}>비밀번호 확인</p>
        <div className={styles.pwInputBox}>
          <input
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className={`${styles.input} ${isActive ? styles.err : ""}`}
            type={see ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          <img
            onClick={handleClick}
            className={styles.btnIcon}
            src={see ? btnSeeIcon : btnCloseIcon}
            alt="btnSeeIcon"
          />
        </div>
      </label>
      {isActive && (
        <p className={styles.errMessage}>*비밀번호가 일치하지 않습니다.</p>
      )}
    </span>
  );
};

export default PasswordCheck;
