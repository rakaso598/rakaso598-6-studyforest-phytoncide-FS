import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";

const PasswordCheck = ({ password }) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(password !== passwordCheck);
  }, [password, passwordCheck]);

  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>비밀번호 확인</p>
      <input
        onChange={(e) => setPasswordCheck(e.target.value)}
        className={`${styles.input} ${isActive ? styles.err : ""}`}
        type="text"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
      />
      {isActive && (
        <p className={styles.errMessage}>*비밀번호가 일치하지 않습니다.</p>
      )}
    </label>
  );
};

export default PasswordCheck;
