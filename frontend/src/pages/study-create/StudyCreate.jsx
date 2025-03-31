import React, { useState } from "react";
import styles from "./StudyCreate.module.css";
import NicknameInput from "../../components/createStudyInput/NicknameInput";
import StudyNameInput from "../../components/createStudyInput/StudyNameInput";
import DescriptionInput from "../../components/createStudyInput/DescriptionInput";
import PasswordInput from "../../components/createStudyInput/PasswordInput";
import PasswordCheck from "../../components/createStudyInput/PasswordCheck";
import Background from "../../components/createStudyInput/Background";
import { studyCreate } from "../../api/study/studyCreate.api";
import { useNavigate } from "react-router-dom";

const StudyCreate = () => {
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("bg1");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const navigate = useNavigate();

  const handleClik = async () => {
    if (
      !nickName ||
      !title ||
      !description ||
      !background ||
      !encryptedPassword
    ) {
      const confirmed = window.confirm("모든 필드를 입력해주세요");
      if (confirmed) {
        return;
      }
    }

    const data = {
      nickName,
      title,
      description,
      background,
      encryptedPassword,
    };

    try {
      const result = await studyCreate(data);

      navigate("/");
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <h2 className={styles.studyCreateTitle}>스터디 만들기.</h2>
        <div className={styles.studyCreateTopInputBox}>
          <NicknameInput setNickName={setNickName} />
          <StudyNameInput setTitle={setTitle} />
          <DescriptionInput setDescription={setDescription} />
        </div>
        <Background setBackground={setBackground} background={background} />
        <div className={styles.studyCreateBottomBox}>
          <PasswordInput setEncryptedPassword={setEncryptedPassword} />
          <PasswordCheck encryptedPassword={encryptedPassword} />
        </div>
        <button onClick={handleClik} className={styles.createBtn}>
          만들기
        </button>
      </article>
    </section>
  );
};

export default StudyCreate;
