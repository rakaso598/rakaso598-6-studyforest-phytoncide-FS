import React, { useState, useEffect } from "react";
import styles from "./StudyEditForm.module.css";
import NicknameInput from "../../../components/update-study-input/NicknameInput";
import StudyNameInput from "../../../components/update-study-input/StudyNameInput";
import DescriptionInput from "../../../components/update-study-input/DescriptionInput";
import PasswordInput from "../../../components/update-study-input/PasswordInput";
import PasswordCheck from "../../../components/update-study-input/PasswordCheck";
import Background from "../../../components/update-study-input/Background";
import { useParams, useNavigate } from "react-router-dom";

const StudyEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [description, setDescription] = useState("");
  const [bg, setBg] = useState("bg1");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await fetch(
          `https://six-study-forest-server.onrender.com/api/study/${id}`
        );
        if (response.ok) {
          const studyData = await response.json();
          setNickname(studyData.nickName);
          setStudyName(studyData.title);
          setDescription(studyData.description);
          setPassword(studyData.encryptedPassword);
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

  const handleUpdateStudy = async () => {
    try {
      const response = await fetch(
        `https://six-study-forest-server.onrender.com/api/study/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickName: nickname,
            title: studyName,
            description: description,
            encryptedPassword: password,
            background: bg,
          }),
        }
      );

      if (response.ok) {
        alert("스터디 정보가 성공적으로 수정되었습니다.");
        navigate(`/study/${id}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `스터디 정보 수정 실패: ${errorData && errorData.message}`
        );
        console.error("스터디 정보 수정 실패:", errorData);
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
          <PasswordCheck password={password} />
        </div>
        <button className={styles.createBtn} onClick={handleUpdateStudy}>
          스터디 수정하기
        </button>
      </article>
    </section>
  );
};

export default StudyEditForm;