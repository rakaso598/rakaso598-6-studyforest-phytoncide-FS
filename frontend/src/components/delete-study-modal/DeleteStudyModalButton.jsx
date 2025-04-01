import React from "react";
import DeleteStudyModal from "./DeleteStudyModal";
import { useDeleteStudyModalController } from "./DeleteStudyModalController";
import styles from "./DeleteStudyModalButton.module.css";

const DeleteStudyModalButton = ({ buttonText }) => {
  const {
    deleteStudyModal,
    handleOpenDeleteStudyModal,
    handleCloseDeleteStudyModal,
  } = useDeleteStudyModalController();

  return (
    <>
      <button
        className={styles.deleteStudyModalButton}
        onClick={handleOpenDeleteStudyModal}
      >
        {buttonText || "스터디 삭제하기"}
      </button>
      <DeleteStudyModal
        isOpen={deleteStudyModal}
        onClose={handleCloseDeleteStudyModal}
      />
    </>
  );
};

export default DeleteStudyModalButton;
