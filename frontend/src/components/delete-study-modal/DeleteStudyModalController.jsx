import { useState } from "react";

export const useDeleteStudyModalController = () => {
  const [deleteStudyModal, setDeleteStudyModal] = useState(false);

  const handleOpenDeleteModal = () => {
    console.log("modal clicked");
    setDeleteStudyModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteStudyModal(false);
  };

  return { deleteStudyModal, handleOpenDeleteModal, handleCloseDeleteModal };
};
