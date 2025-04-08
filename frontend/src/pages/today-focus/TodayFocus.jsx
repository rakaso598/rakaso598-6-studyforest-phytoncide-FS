import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TodayFocus.module.css";
import { getStudyDetail } from "@api/study/studyDetail.api";
import { patchPoint } from "@api/focus/focusPoint.api.js";
import TodayFocusPoint from "./components/Point/TodayFocusPoint.jsx";
import TodayFocusToast from "./components/Toast/TodayFocusToast.jsx";
import TodayFocusTimer from "./components/Timer/TodayFocusTimer.jsx";
import StudyNavbar from "@components/study-navbar/StudyNavbar.jsx";
import {
  TimerContextProvider,
  useTimerState,
} from "../../contexts/timerState.context.jsx";

const TodayFocus = () => {
  const { studyId } = useParams();
  const [point, setPoint] = useState(3);
  const [totalPoint, setTotalPoint] = useState(0);
  const { timerState, setTimerState } = useTimerState();
  const { isStart, isPause, isComplete } = timerState;

  // 스터디 상세 불러오기 API
  const getStudy = async (studyId) => {
    const study = await getStudyDetail(studyId);
    return study;
  };

  // 포인트 업데이트 API
  const pointUpdate = async (studyId, totalPoint) => {
    try {
      await patchPoint(studyId, totalPoint);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  // 처음 렌더링 때 포인트 불러오기
  useEffect(() => {
    const pointLoad = async () => {
      const { point } = await getStudy(studyId);

      setTotalPoint(point);
    };

    pointLoad();
  }, []);

  // 집중 성공 시 DB에 포인트 저장
  useEffect(() => {
    if (point === 0) return;

    if (isComplete) {
      pointUpdate(studyId, { totalPoint });
    }
  }, [totalPoint, isComplete]);

  // 집중 성공 시 총합 포인트 변경
  useEffect(() => {
    if (isStart) return;

    if (!isStart && isComplete) {
      setTotalPoint((prevTotalPoint) => (prevTotalPoint += point));
    }
  }, [isStart, point, isComplete]);

  // 시간 설정에 따른 포인트 설정
  const rewardPointSetByTime = (minute) => {
    setPoint(3 + Math.floor(minute / 10));
  };

  // toast 팝업 자동종료
  useEffect(() => {
    const toastOff = setTimeout(() => {
      if (!isPause && !isComplete) return;

      if (isPause)
        setTimerState((prevState) => ({ ...prevState, isPause: false }));
      if (isComplete)
        setTimerState((prevState) => ({ ...prevState, isComplete: false }));
    }, 2000);

    return () => {
      if (isPause || isComplete) return;

      clearTimeout(toastOff);
    };
  }, [isPause, isComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <StudyNavbar
          studyId={studyId}
          link={`/studies/${studyId}/habit`}
          pageName={"오늘의 습관"}
        />
        <TodayFocusPoint totalPoint={totalPoint} />
        <div className={styles.focusContainer}>
          <section className={styles.focus}>
            <h2 className={styles.focusTxt}>오늘의 집중</h2>
            <TodayFocusTimer rewardPointSetByTime={rewardPointSetByTime} />
          </section>
        </div>
      </div>
      <TodayFocusToast point={point} />
    </div>
  );
};

export default TodayFocus;
