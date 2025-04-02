import React from "react";
import styles from "./Description.module.css";

const DescriptionInput = ({ setDescription, description }) => {
  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>소개</p>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        className={styles.inputBox}
        placeholder="소개 멘트를 작성해 주세요"
        value={description} // value 속성 추가
      />
    </label>
  );
};

export default DescriptionInput;