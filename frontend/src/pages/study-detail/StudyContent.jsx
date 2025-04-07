import React, { useState, useEffect } from "react";
import styles from "./StudyContent.module.css";
import arrowIcon from "/images/icon/ic_arrow_right.svg";
import { Link, useParams } from "react-router-dom";
import { getStudyDetail } from "@api/study/studyDetail.api";
import TodayHabitButton from "./components/TodayHabitButton";
import TodayFocusButton from "./components/TodayFocusButton";

const StudyContent = () => {
  const { studyId } = useParams();
  const [study, setStudy] = useState({
    title: "",
    nickName: "",
    description: "",
    point: 0,
  });
  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const studyData = await getStudyDetail(studyId);
        setStudy(studyData);
      } catch (error) {
        console.error("Failed to fetch study details:", error);
      }
    };

    fetchStudyData();
  }, [studyId]);
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentTop}>
        <h1 className={styles.title}>{study.title}</h1>
        <div className={styles.buttons}>
          <TodayFocusButton
            buttonText={
              <>
                <p>오늘의 집중</p>
                <img src={arrowIcon} alt="오른쪽 화살표" />
              </>
            }
          ></TodayFocusButton>

          <TodayHabitButton
            buttonText={
              <>
                <p>오늘의 습관</p>
                <img src={arrowIcon} alt="오른쪽 화살표" />
              </>
            }
          ></TodayHabitButton>
        </div>
      </div>

      <div className={styles.contentBottom}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>소개</h2>
          <p className={styles.text}>{study.description}</p>
        </div>

        <div className={styles.points}>
          <h2 className={styles.heading}>현재까지 획득한 포인트</h2>
          <div className={styles.pointDisplay}>
            <img
              src="/images/icon/ic_point.svg"
              alt="point icon"
              className={styles.pointIcon}
            />
            <span className={styles.pointValue}>{study.point}P 획득</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyContent;
