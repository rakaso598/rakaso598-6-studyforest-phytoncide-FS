import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./StudyDetail.module.css";
import StudyDetailNav from "./StudyDetailNav";
import StudyContent from "./StudyContent.jsx";
import HabitRecordTable from "./HabitRecordTable";
import { getStudyDetail } from "@api/study/studyDetail.api";

const StudyDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studyData, setStudyData] = useState(null);
  const { studyId } = useParams();

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        setIsLoading(true);
        const data = await getStudyDetail(studyId);
        setStudyData(data);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyData();
  }, [studyId]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>스터디 데이터를 불러오는 중이에요</p>
        <ClipLoader size={50} color="#99c08e" loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <StudyDetailNav />
          <StudyContent studyData={studyData} />
          <HabitRecordTable />
        </div>
      </section>
    </div>
  );
};

export default StudyDetail;
