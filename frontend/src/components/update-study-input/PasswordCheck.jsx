import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import btnCloseIcon from "/images/icon/btn_visibility_on_24px-1.svg";
import btnSeeIcon from "/images/icon/btn_visibility_on_24px.svg";

const PasswordCheck = ({ password, onPasswordCheck }) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seeCheck, setSeeCheck] = useState(false);

  useEffect(() => {
    if (passwordCheck === "") {
      setIsActive(false);
      onPasswordCheck(true);
    } else {
      const match = password === passwordCheck;
      setIsActive(!match);
      onPasswordCheck(match);
    }
  }, [password, passwordCheck, onPasswordCheck]);

  const handleCheckClick = () => {
    setSeeCheck(!seeCheck);
  };

  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>새 비밀번호 확인</p>
      <div className={styles.pwInputBox}>
        <input
          onChange={(e) => setPasswordCheck(e.target.value)}
          className={`${styles.input} ${isActive ? styles.err : ""}`}
          type={seeCheck ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해주세요"

        />
        <img
          onClick={handleCheckClick}
          className={styles.btnIcon}
          src={seeCheck ? btnSeeIcon : btnCloseIcon}
          alt="btnSeeIcon"
        />
      </div>

      {isActive && <p className={styles.errMessage}>*비밀번호가 일치하지 않습니다.</p>}
      {!isActive && passwordCheck !== "" && (
        <p className={styles.successMessage}>비밀번호가 일치합니다.</p>
      )}
    </label>
  );
};

export default PasswordCheck;