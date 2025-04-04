import React from "react";
import styles from "./DeleteStudyToast.module.css";

const DeleteStudyToast = ({ error, success, message }) => {
  return (
    <aside className={styles.toastContainer}>
      <p className={`${styles.toastError} ${error && styles.show}`}>
        🚨 {message || "비밀번호가 일치하지 않습니다."}
      </p>
      <p className={`${styles.toastSuccess} ${success && styles.show}`}>
        🎉 스터디가 성공적으로 삭제되었습니다
      </p>
    </aside>
  );
};

export default DeleteStudyToast;
