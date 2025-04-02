import { Link } from "react-router-dom";
import styles from "./StudyNavbar.module.css";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { useEffect, useState } from "react";

const StudyNavbar = ({ id, link, pageName }) => {
  const [study, setStudy] = useState({ nickName: "", title: "" });

  // 스터디 상세 불러오기
  const studyLoad = async (id) => {
    const study = await getStudyDetail(id);
    return study;
  };

  // 스터디 nickName, title 추출하기
  useEffect(() => {
    const getStudy = async () => {
      const { nickName, title } = await studyLoad(id);

      setStudy((prevStudy) => ({ ...prevStudy, nickName, title }));
    };

    getStudy();
  }, []);

  return (
    <nav className={styles.navBar}>
      <h1 className={styles.navTxt}>
        {study.nickName}의 {study.title}
      </h1>
      <div className={styles.navBtnContainer}>
        <Link to={link} className={styles.navBtn}>
          {pageName}
          <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
        </Link>
        <Link to="/" className={styles.navBtn}>
          <p>홈</p>
          <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
        </Link>
      </div>
    </nav>
  );
};

export default StudyNavbar;
