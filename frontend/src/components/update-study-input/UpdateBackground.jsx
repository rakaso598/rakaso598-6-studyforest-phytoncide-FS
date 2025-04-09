import React from "react";
import styles from "./UpdateBackground.module.css";
import bg1 from "/images/study-bg/bg1.svg";
import bg2 from "/images/study-bg/bg2.svg";
import bg3 from "/images/study-bg/bg3.svg";
import bg4 from "/images/study-bg/bg4.svg";
import bg5 from "/images/study-bg/bg5.svg";
import bg6 from "/images/study-bg/bg6.svg";
import bg7 from "/images/study-bg/bg7.svg";
import bg8 from "/images/study-bg/bg8.svg";
import selected from "/images/icon/ic_bg_selected.svg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const Background = ({ setBg, bg }) => {
  return (
    <div className={styles.studyCreateMidBgBox}>
      <p className={styles.inputBoxTitle}>배경을 선택해주세요</p>
      <div className={styles.bgBox}>
        {backgroundImages.map((bgs, idx) => (
          <span key={bgs} className={styles.background}>
            <img
              className={styles.img}
              src={bgs}
              alt={`bg${idx + 1}`}
              onClick={(e) => setBg(e.target.alt)}
            />
            {bg && bg.slice(2, 3) === String(idx + 1) && (
              <img className={styles.selected} src={selected} alt="selected" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Background;