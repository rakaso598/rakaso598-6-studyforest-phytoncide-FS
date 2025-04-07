import React from "react";
import PasswordModal from "./PasswordModal";
import { usePasswordModalController } from "./PasswordModalController";

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
      <button className={buttonClassName} onClick={handleOpen}>
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
