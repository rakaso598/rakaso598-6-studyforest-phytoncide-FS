import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TodayFocus.module.css";
import { getPoint, patchPoint } from "@api/todayFocus/todayFocus.api.js";
import TodayFocusPoint from "./TodayFocusPoint.jsx";
import TodayFocusToast from "./TodayFocusToast";
import TodayFocusTimer from "./TodayFocusTimer.jsx";
import StudyNavbar from "@components/study-navbar/StudyNavbar.jsx";

const TodayFocus = () => {
  const { id } = useParams();
  const [point, setPoint] = useState(5);
  const [totalPoint, setTotalPoint] = useState(0);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [complete, setComplete] = useState(false);

  // 포인트 불러오기 API
  const pointLoad = async (id) => {
    try {
      const { point } = await getPoint(id);
      return point;
    } catch (e) {
      console.log(e.response.data);
    }
  };

  // 포인트 업데이트 API
  const pointUpdate = async (id, totalPoint) => {
    try {
      await patchPoint(id, totalPoint);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  // 처음 렌더링 때 포인트 불러오기
  useEffect(() => {
    const getPoint = async () => {
      const point = await pointLoad(id);

      setTotalPoint(point);
    };

    getPoint();
  }, []);

  // 집중 성공 시 DB에 포인트 저장
  useEffect(() => {
    if (point === 0) return;

    if (complete) {
      pointUpdate(id, { totalPoint });
    }
  }, [totalPoint]);

  // 집중 성공 시 총합 포인트 변경
  useEffect(() => {
    if (start) return;

    if (!start && complete) {
      setTotalPoint((prevTotalPoint) => (prevTotalPoint += point));
    }
  }, [start, point]);

  // 시간 설정에 따른 포인트 설정
  const rewardPointSetByTime = (e) => {
    const time = e.target.value;

    if (isNaN(time)) return;
    if (time < 10) {
      setPoint(0);
    } else {
      setPoint(time <= 19 ? 3 : 3 + Math.floor(time / 10 - 1));
    }
  };

  // toast 팝업 자동종료
  useEffect(() => {
    const toastOff = setTimeout(() => {
      if (!pause && !complete) return;

      if (pause) setPause(false);
      if (complete) setComplete(false);
    }, 2000);

    return () => {
      if (pause || complete) return;

      clearTimeout(toastOff);
    };
  }, [pause, complete]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <StudyNavbar
          id={id}
          link={`/study/${id}/habit`}
          pageName={"오늘의 습관"}
        />
        <TodayFocusPoint totalPoint={totalPoint} />
        <div className={styles.focusContainer}>
          <section className={styles.focus}>
            <h2 className={styles.focusTxt}>오늘의 집중</h2>
            <TodayFocusTimer
              rewardPointSetByTime={rewardPointSetByTime}
              setComplete={setComplete}
              setPause={setPause}
              start={start}
              setStart={setStart}
            />
          </section>
        </div>
      </div>
      <TodayFocusToast pause={pause} complete={complete} point={point} />
    </div>
  );
};

export default TodayFocus;
