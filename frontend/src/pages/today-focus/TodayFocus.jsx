import React from "react";
import { Link } from "react-router-dom";
import styles from "./TodayFocus.module.css";

const TodayFocus = () => {
  const point = 310;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <nav className={styles.navBar}>
          <h1 className={styles.navTxt}>연우의 개발공장</h1>
          <div className={styles.navBtnContainer}>
            <Link to="/study-create" className={styles.navBtn}>
              오늘의 습관
              <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
            </Link>
            <Link to="/" className={styles.navBtn}>
              <p>홈</p>
              <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
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
            <p className={styles.focusTimer}>25:00</p>
            <button className={styles.focusBtn}>
              <img src="/images/icon/ic_play.svg" alt="시작" />
              <p>Start!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayFocus;
