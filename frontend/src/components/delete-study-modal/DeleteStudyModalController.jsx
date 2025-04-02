import { useState } from "react";

export const useDeleteStudyModalController = () => {
  const [deleteStudyModal, setDeleteStudyModal] = useState(false);

  const handleOpenDeleteStudyModal = () => {
    console.log("modal clicked");
    setDeleteStudyModal(true);
  };

  const handleCloseDeleteStudyModal = () => {
    setDeleteStudyModal(false);
  };

  return {
    deleteStudyModal,
    handleOpenDeleteStudyModal,
    handleCloseDeleteStudyModal,
  };
};
