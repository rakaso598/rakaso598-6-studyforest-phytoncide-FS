import React from "react";
import styles from "./StudyContent.module.css";
import arrowIcon from "/images/icon/ic_arrow_right.svg";
import { Link, useParams } from "react-router-dom";

const StudyContent = () => {
  const { studyId } = useParams();
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentTop}>
        <h1 className={styles.title}>지수의 개발공장</h1>
        <div className={styles.buttons}>
          {/* 임시 링크 태그임 비밀번호 요구하는 모달로 바꿔야함 */}
          <Link to={`/studies/${studyId}/focus`} className={styles.button}>
            <p>오늘의 집중</p>
            <img src={arrowIcon} />
          </Link>
          <Link to={`/studies/${studyId}/habit`} className={styles.button}>
            <p>오늘의 습관</p>
            <img src={arrowIcon} />
          </Link>
        </div>
      </div>

      <div className={styles.contentBottom}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>소개</h2>
          <p className={styles.text}>오늘 하루도 화이팅</p>
        </div>

        <div className={styles.points}>
          <h2 className={styles.heading}>현재까지 획득한 포인트</h2>
          <div className={styles.pointDisplay}>
            <img
              src="/images/icon/ic_point.svg"
              alt="point icon"
              className={styles.pointIcon}
            />
            <span className={styles.pointValue}>310P 획득</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyContent;
