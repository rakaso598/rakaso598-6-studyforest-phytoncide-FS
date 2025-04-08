import React, { useState } from "react";
import styles from "./StudyCreate.module.css";
import NicknameInput from "../../components/create-study-input/NicknameInput";
import StudyNameInput from "../../components/create-study-input/StudyNameInput";
import DescriptionInput from "../../components/create-study-input/descriptionInput/DescriptionInput";
import PasswordInput from "../../components/create-study-input/passwordInput/PasswordInput";
import PasswordCheck from "../../components/create-study-input/PasswordCheck";
import Background from "../../components/create-study-input/background/Background";
import { studyCreate } from "../../api/study/studyCreate.api";
import { useNavigate } from "react-router-dom";

const StudyCreate = () => {
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("bg1");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const handleClik = async () => {
    if (!nickName.trim()) {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    if (!description.trim()) {
      alert("소개를를 입력해주세요");
      return;
    }

    if (!background) {
      alert("배경을 선택해주세요");
      return;
    }

    if (!encryptedPassword.trim()) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (!passwordCheck.trim()) {
      alert("비밀번호를 확인해주세요");
      return;
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
        <h2 className={styles.studyCreateTitle}>스터디 만들기</h2>
        <div className={styles.studyCreateTopInputBox}>
          <NicknameInput nickName={nickName} setNickName={setNickName} />
          <StudyNameInput title={title} setTitle={setTitle} />
          <DescriptionInput setDescription={setDescription} />
        </div>
        <Background setBackground={setBackground} background={background} />
        <div className={styles.studyCreateBottomBox}>
          <PasswordInput setEncryptedPassword={setEncryptedPassword} />
          <PasswordCheck
            encryptedPassword={encryptedPassword}
            passwordCheck={passwordCheck}
            setPasswordCheck={setPasswordCheck}
          />
        </div>
        <button onClick={handleClik} className={styles.createBtn}>
          만들기
        </button>
      </article>
    </section>
  );
};

export default StudyCreate;
