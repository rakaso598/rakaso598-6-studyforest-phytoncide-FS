import React, { useState } from "react";
import styles from "./ShareModal.module.css";

const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>공유하기</p>
          <button
            type="button"
            onClick={onClose}
            className={styles.modalCloseButton}
          >
            닫기
          </button>
        </div>
        <div className={styles.linkContainer}>
          <input
            type="text"
            value={shareUrl}
            readOnly
            className={styles.linkInput}
          />
          <button onClick={copyToClipboard} className={styles.copyButton}>
            {copied ? "복사됨!" : "복사"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
