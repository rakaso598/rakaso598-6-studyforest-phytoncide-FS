import React from "react";
import styles from "./StudyDetail.module.css";
import StudyDetailNav from "./StudyDetailNav";
import StudyContent from "./StudyContent.jsx";
import HabitRecordTable from "./HabitRecordTable";

const StudyDetail = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <StudyDetailNav />

        <StudyContent />

        <HabitRecordTable />
      </div>
    </section>
  );
};

export default StudyDetail;
