import React from "react";
import PasswordModal from "./PasswordModal";
import { usePasswordModalController } from "./PasswordModalController";
import styles from "./PasswordModalButton.module.css";

const PasswordModalButton = ({
  buttonText,
  buttonClassName,
  modalTitle,
  modalMessage,
  actionButtonText,
  closeButtonText,
  onSuccess,
  verifyPassword,
  customToastContainer,
}) => {
  const { isOpen, handleOpen, handleClose } = usePasswordModalController();

  return (
    <>
      <button
        className={buttonClassName || styles.passwordModalButton}
        onClick={handleOpen}
      >
        {buttonText}
      </button>
      <PasswordModal
        isOpen={isOpen}
        onClose={handleClose}
        title={modalTitle}
        message={modalMessage}
        actionButtonText={actionButtonText}
        closeButtonText={closeButtonText}
        onSuccess={onSuccess}
        verifyPassword={verifyPassword}
        customToastContainer={customToastContainer}
      />
    </>
  );
};

export default PasswordModalButton;
