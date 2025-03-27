import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TodayFocus.module.css";

const TodayFocus = () => {
  const [timer, setTimer] = useState(false);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  const handleTimerInput = (e) => {
    if (e.target.id === "minute") {
      if (minute !== "00") return;
      setMinute("");
    } else {
      if (second !== "00") return;
      setSecond("");
    }
  };

  const handleTimerDefault = (e) => {
    if (e.target.id === "minute" && !minute) {
      setMinute("00");
    } else if (!second) {
      setSecond("00");
    }
  };

  const handleTimerValue = (e) => {
    if (e.target.id === "minute") {
      setMinute(e.target.value);
    } else {
      setSecond(e.target.value);
    }
  };

  const handleTimerStart = () => {
    setTimer(!timer);
  };

  const point = 310;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <nav className={styles.navBar}>
            <h1 className={styles.navTxt}>연우의 개발공장</h1>
            <div className={styles.navBtnContainer}>
              <Link to="/study-create" className={styles.navBtn}>
                오늘의 습관
                <img
                  src="/images/icon/ic_arrow_right.svg"
                  alt="오른쪽 화살표"
                />
              </Link>
              <Link to="/" className={styles.navBtn}>
                <p>홈</p>
                <img
                  src="/images/icon/ic_arrow_right.svg"
                  alt="오른쪽 화살표"
                />
              </Link>
            </div>
          </nav>
          <div className={styles.pointContainer}>
            <p className={styles.pointTxt}>현재까지 획득한 포인트</p>
            <div className={styles.point}>
              <img src="/images/icon/ic_point.svg" alt="포인트" />
              <p className={styles.pointTotalTxt}>{point}P 획득</p>
            </div>
          </div>
          <div className={styles.focusContainer}>
            <div className={styles.focus}>
              <h2 className={styles.focusTxt}>오늘의 집중</h2>
              {timer ? (
                <div className={styles.focusSelectTimeContainer}>
                  <img src="/public/images/icon/ic_timer.svg" alt="시계" />
                  <p>{minute + ":" + second}</p>
                </div>
              ) : null}
              <div className={styles.focusTimerContainer}>
                <input
                  onClick={handleTimerInput}
                  onBlur={handleTimerDefault}
                  onChange={handleTimerValue}
                  value={minute}
                  className={styles.focusMinTimer}
                  id="minute"
                />
                <p>:</p>
                <input
                  onClick={handleTimerInput}
                  onBlur={handleTimerDefault}
                  onChange={handleTimerValue}
                  value={second}
                  className={styles.focusSecTimer}
                  id="second"
                />
              </div>
              <div className={styles.focusBtnContainer}>
                {timer ? (
                  <button className={styles.focusPauseBtn}>
                    <img src="/images/icon/ic_pause.svg" alt="일시정지" />
                  </button>
                ) : null}
                <button
                  onClick={handleTimerStart}
                  className={`${styles.focusStartBtn} 
                  ${timer ? styles.disable : null} 
                  ${timer ? styles.timeOver : null}`}
                >
                  <img src="/images/icon/ic_play.svg" alt="시작" />
                  <p>Start!</p>
                </button>
                {timer ? (
                  <button className={styles.focusRestartBtn}>
                    <img src="/images/icon/ic_restart.svg" alt="초기화" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.modal}>
        <p>🚨 집중이 중단되었습니다.</p>
      </div> */}
    </>
  );
};

export default TodayFocus;
