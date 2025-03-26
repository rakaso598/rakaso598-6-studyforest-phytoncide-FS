import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.recentStudy__container}>
        <div className={styles.recentStudy__title}>최근 조회한 스터디</div>
      </div>
      <div className={styles.studyExplore__container}>
        <div className={styles.studyExplore__title}>스터디 둘러보기</div>
      </div>
    </section>
  );
};

export default Home;
