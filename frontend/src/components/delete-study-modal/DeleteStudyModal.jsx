import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteStudyModal.module.css";
import { deleteStudy } from "@api/study/deleteStudy.api.js";
import { getStudyDetail } from "@api/study/studyDetail.api";

const DeleteStudyModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studyTitle, setStudyTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // 모달 오픈시 폼과 토스트 메세지 리셋
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setErrorMessage("");
    }
  }, [isOpen]);

  // 모달 오픈시 스터디 디테일 로드
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const study = await getStudyDetail(id);
        setStudyTitle(study.title);
        console.log(`Study title = ${study.title}`);
        console.log(`Study info = ${study}`);
      } catch (error) {
        console.error("스터디 기능 불러오기에서 에러가 발생하였습니다", error);
      }
    };

    if (isOpen && id) {
      fetchStudyDetail();
    }
  }, [isOpen, id]);
  if (!isOpen) return null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteStudy = async () => {
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 삭제 프론트 API 함수 호출 - 백엔드 스터디 삭제 API 에서 비밀번호 검증도 함께 수행됨
      const deleteResponse = await deleteStudy(id, password);

      if (deleteResponse && deleteResponse.success) {
        // 삭제 성공시 localStorage 업데이트하여 현재 삭제한 id를 가지고있는 parsedData에 일치하는 스터디 있으면 걸러서 안보이게
        const storedData = localStorage.getItem("studyForest");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const updatedData = parsedData.filter(
            (study) => study.id != parseInt(id)
          );
          localStorage.setItem("studyForest", JSON.stringify(updatedData));
        }

        navigate("/"); // 삭제 성공 시 공부의 숲 홈으로 이동
      } else {
        setErrorMessage(
          deleteResponse?.message || "스터디 삭제에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("스터디 삭제 중 오류:", error);
      const errorMsg = error.response?.data?.message;
      setErrorMessage(errorMsg || "스터디 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>{studyTitle}</p>
          <button
            type="button"
            onClick={onClose}
            className={styles.modalCloseButton}
          >
            나가기
          </button>
        </div>
        <p className={styles.modalMessage}>권한이 필요해요!</p>
        <div className={styles.modalInputContainer}>
          <p className={styles.modalInputLabel}>비밀번호</p>
          <input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.modalInput}
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
        <button
          className={`${styles.modalVerifyButton}`}
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
