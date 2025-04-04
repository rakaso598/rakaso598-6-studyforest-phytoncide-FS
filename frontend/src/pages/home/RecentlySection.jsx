import { useEffect, useState } from "react";
import HomeCard from "@components/home/HomeCard";
import styles from "./RecentlySection.module.css";
import { getRecentlyViewedStudies } from "@api/home/getStudy.api";
import { ClipLoader } from "react-spinners";

// 로컬 스토리지에 데이터가 있는지 확인
const HAS_CARD_ID = localStorage.getItem("studyForestCardIds");

const RecentlySection = () => {
  const [recentlyViewedStudies, setRecentlyViewedStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("studyForestCardIds");

    // 여기서 서버에서 카드 아이디에 따른 카드 데이터 조회하기 조회
    const fetchRecentlyViewedStudies = async () => {
      if (!data) {
        return;
      }

      try {
        setIsLoading(true);
        const recentlyViewedStudies = await getRecentlyViewedStudies(data);
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

      {HAS_CARD_ID ? (
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

export default RecentlySection;
