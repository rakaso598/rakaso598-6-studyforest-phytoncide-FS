import { useEffect, useState } from "react";
import styles from "./RecentlyViewedSection.module.css";
import { ClipLoader } from "react-spinners";
import { getRecentlyViewedStudies } from "@api/home/home.api";
import HomeCard from "./HomeCard";

const RecentlyVeiwedSection = () => {
  const cardIds = localStorage.getItem("studyForestCardIds");

  const [recentlyViewedStudies, setRecentlyViewedStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // cardIds가 없다면 조회 X, 있다면 스터디 조회
    const fetchRecentlyViewedStudies = async () => {
      if (!cardIds) {
        return;
      }

      try {
        setIsLoading(true);

        // 최근 조회한 스터디 목록 조회
        const recentlyViewedStudies = await getRecentlyViewedStudies(cardIds);
        setRecentlyViewedStudies(recentlyViewedStudies);
      } catch (error) {
        console.error("최근 조회한 스터디 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyViewedStudies();
  }, []);

  return (
    <div className={styles.recentStudyContainer}>
      <div className={styles.title}>최근 조회한 스터디</div>

      {cardIds ? (
        isLoading ? (
          <div className={styles.loading}>
            <ClipLoader size={100} color="#578246" loading={true} />
          </div>
        ) : recentlyViewedStudies.length > 0 ? (
          <div className={styles.cardListContainer}>
            <ul className={styles.cardList}>
              {recentlyViewedStudies.map((data) => (
                <div key={`recently-${data.id}`} className={styles.cardWrapper}>
                  <HomeCard data={data} />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.noData}>
            최근 조회한 스터디를 불러올 수 없습니다.
          </div>
        )
      ) : (
        <div className={styles.noData}>아직 조회한 스터디가 없습니다.</div>
      )}
    </div>
  );
};

export default RecentlyVeiwedSection;
