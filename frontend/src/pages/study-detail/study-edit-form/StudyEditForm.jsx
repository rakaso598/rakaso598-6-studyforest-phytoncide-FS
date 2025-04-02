import React, { useState, useEffect, useCallback } from "react";
import styles from "./StudyEditForm.module.css";
import NicknameInput from "../../../components/update-study-input/NicknameInput";
import StudyNameInput from "../../../components/update-study-input/StudyNameInput";
import DescriptionInput from "../../../components/update-study-input/DescriptionInput";
import PasswordInput from "../../../components/update-study-input/PasswordInput";
import PasswordCheck from "../../../components/update-study-input/PasswordCheck";
import Background from "../../../components/update-study-input/Background";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const StudyEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [description, setDescription] = useState("");
  const [bg, setBg] = useState("bg1");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://six-study-forest-server.onrender.com/api/study/${id}`
        );
        if (response.status === 200) {
          const studyData = response.data;
          setNickname(studyData.nickName);
          setStudyName(studyData.title);
          setDescription(studyData.description);
          setBg(studyData.background);
        } else {
          console.error("스터디 정보 불러오기 실패");
        }
      } catch (error) {
        console.error("스터디 정보 불러오기 중 오류 발생:", error);
      }
    };

    fetchStudyData();
  }, [id]);

  const handlePasswordCheck = useCallback((match) => {
    setIsPasswordMatch(match);
  }, []);

  const handleUpdateStudy = async () => {
    if (!isPasswordMatch) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!nickname || !studyName || !description || !password || !bg) {
      setErrorMessage("모든 필수 항목을 입력해주세요.");
      return;
    }
    try {
      const response = await axiosInstance.put(
        `https://six-study-forest-server.onrender.com/api/study/${id}/update`,
        {
          nickName: nickname,
          title: studyName,
          description: description,
          encryptedPassword: password,
          background: bg,
        }
      );

      if (response.status === 200) {
        alert("스터디 정보가 성공적으로 수정되었습니다.");
        navigate(`/study/${id}`);
      } else {
        setErrorMessage(
          `스터디 정보 수정 실패: ${response.data && response.data.message}`
        );
        console.error("스터디 정보 수정 실패:", response.data);
      }
    } catch (error) {
      console.error("스터디 정보 수정 중 오류 발생:", error);
      setErrorMessage("스터디 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <h2 className={styles.studyCreateTitle}>스터디 수정하기</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.studyCreateTopInputBox}>
          <NicknameInput setNickname={setNickname} nickname={nickname} />
          <StudyNameInput setStudyName={setStudyName} studyName={studyName} />
          <DescriptionInput setDescription={setDescription} description={description} />
        </div>
        <Background setBg={setBg} bg={bg} />
        <div className={styles.studyCreateBottomBox}>
          <PasswordInput setPassword={setPassword} />
          <PasswordCheck password={password} onPasswordCheck={handlePasswordCheck} />
        </div>
        <button
          className={`${styles.createBtn} ${!isPasswordMatch ? styles.disabledBtn : ""
            }`}
          onClick={handleUpdateStudy}
          disabled={!isPasswordMatch}
        >
          스터디 수정하기
        </button>
      </article>
    </section>
  );
};

export default StudyEditForm;