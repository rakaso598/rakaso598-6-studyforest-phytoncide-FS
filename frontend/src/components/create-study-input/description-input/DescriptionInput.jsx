import React from "react";
import styles from "./Description.module.css";

const DescriptionInput = ({ description, setDescription }) => {
  return (
    <label className={styles.label}>
      <p className={styles.inputBoxTitle}>소개</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.inputBox}
        placeholder="소개 멘트를 작성해 주세요"
      />
    </label>
  );
};

export default DescriptionInput;
