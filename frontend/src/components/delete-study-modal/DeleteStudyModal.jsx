import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteStudyModal.module.css";
import { deleteStudy } from "@api/study/deleteStudy.api.js";
import { getStudyDetail } from "@api/study/studyDetail.api";
import DeleteStudyToast from "./DeleteStudyToast";

const DeleteStudyModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studyTitle, setStudyTitle] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();
  const { studyId } = useParams();

  // 모달 오픈시 폼과 토스트 메세지 리셋
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setErrorMessage("");
      setShowErrorToast(false);
      setShowSuccessToast(false);
    }
  }, [isOpen]);

  // 모달 오픈시 스터디 디테일 로드
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const study = await getStudyDetail(studyId);
        setStudyTitle(study.title);
      } catch (error) {
        console.error("스터디 불러오기 에러:", error);
      }
    };

    if (isOpen && studyId) {
      fetchStudyDetail();
    }
  }, [isOpen, studyId]);

  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteStudy = async () => {
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      setShowErrorToast(true);

      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);

      return;
    }

    try {
      const deleteResponse = await deleteStudy(studyId, password);

      if (deleteResponse && deleteResponse.success) {
        setShowSuccessToast(true);

        const storedData = localStorage.getItem("studyForest");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const updatedData = parsedData.filter(
            (study) => study.id != parseInt(studyId)
          );
          localStorage.setItem("studyForest", JSON.stringify(updatedData));
        }

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(
          deleteResponse?.message || "스터디 삭제에 실패했습니다."
        );
        setShowErrorToast(true);

        setTimeout(() => {
          setShowErrorToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error("스터디 삭제 중 오류:", error);
      const errorMsg = error.response?.data?.message;
      setErrorMessage(errorMsg || "스터디 삭제 중 오류가 발생했습니다.");
      setShowErrorToast(true);

      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{studyTitle}</p>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            나가기
          </button>
        </div>
        <p className={styles.message}>권한이 필요해요!</p>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
          <DeleteStudyToast
            error={showErrorToast}
            success={showSuccessToast}
            message={errorMessage}
          />
        </div>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleDeleteStudy}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteStudyModal;
