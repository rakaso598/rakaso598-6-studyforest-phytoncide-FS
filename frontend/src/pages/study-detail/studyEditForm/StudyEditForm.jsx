import React, { useState } from "react";
import styles from "./StudyEditForm.module.css";
import NicknameInput from "../../../components/createStudyInput/NicknameInput";
import StudyNameInput from "../../../components/createStudyInput/StudyNameInput";
import DescriptionInput from "../../../components/createStudyInput/DescriptionInput";
import PasswordInput from "../../../components/createStudyInput/PasswordInput";
import PasswordCheck from "../../../components/createStudyInput/PasswordCheck";
import Background from "../../../components/createStudyInput/Background";
import { useParams, useNavigate } from "react-router-dom"; // useParams, useNavigate 추가

const StudyEditForm = () => {
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const navigate = useNavigate(); // useNavigate 추가
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [description, setDescription] = useState("");
  const [bg, setBg] = useState("bg1");
  const [password, setPassword] = useState("");

  const handleUpdateStudy = async () => {
    try {
      const response = await fetch(`/api/study/${id}/update`, { // 동적으로 id 사용
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(id), // id를 정수로 변환
          nickName: nickname,
          title: studyName,
          description: description,
          encryptedPassword: password, // 서버 측 암호화 권장
          background: bg,
        }),
      });

      if (response.ok) {
        alert("스터디 정보가 성공적으로 수정되었습니다.");
        navigate(`/study/${id}`); // 수정 완료 후 스터디 상세 페이지로 이동
      } else {
        const errorData = await response.json();
        alert(`스터디 정보 수정 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("스터디 정보 수정 중 오류 발생:", error);
      alert("스터디 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <h2 className={styles.studyCreateTitle}>스터디 수정하기</h2>
        <div className={styles.studyCreateTopInputBox}>
          <NicknameInput setNickname={setNickname} />
          <StudyNameInput setStudyName={setStudyName} />
          <DescriptionInput setDescription={setDescription} />
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