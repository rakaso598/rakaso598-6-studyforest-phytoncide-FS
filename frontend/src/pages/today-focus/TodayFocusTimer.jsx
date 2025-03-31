import { useEffect, useState } from "react";
import styles from "./TodayFocus.module.css";
import TodayFocusTimerBtn from "./TodayFocusTimerBtn";

const TodayFocusTimer = ({
  rewardPointSetByTime,
  setComplete,
  pause,
  setPause,
  start,
  setStart,
}) => {
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [tempTime, setTempTime] = useState({ min: "00", sec: "00" });
  const [countDown, setCountDown] = useState(false);
  const [timeover, setTimeover] = useState(false);
  const [btnToggle, setBtnToggle] = useState(false);

  // 시작 버튼
  const handleClickStart = () => {
    if (start) {
      setStart(false);
      setCountDown(false);
      setTimeover(false);
      setComplete(true);
      setMinute(tempTime.min);
      setSecond(tempTime.sec);
      return;
    }
    setStart(true);
    setBtnToggle(true);
  };

  // 일시 정지 버튼
  const handleClickPause = () => {
    if (pause) return;
    setPause(true);
    setStart(false);
    setCountDown(false);
    setBtnToggle(false);
  };

  // 리셋 버튼
  const handleClickReset = () => {
    setStart(false);
    setBtnToggle(false);
    setCountDown(false);
    setTimeover(false);
    setMinute(tempTime.min);
    setSecond(tempTime.sec);
  };

  // 타이머 디폴트 값
  const handleTimerDefault = (e) => {
    if (e.target.value.length >= 2) return;
    if (e.target.id === "minute" && (!minute || minute === "0")) {
      setMinute("00");
      setTempTime({ ...tempTime, min: "00" });
    } else if (!second || second === "0") {
      setSecond("00");
      setTempTime({ ...tempTime, sec: "00" });
    } else if (e.target.id === "minute" && Number(e.target.value) <= 10) {
      setMinute("0" + e.target.value);
      setTempTime({ ...tempTime, min: "0" + e.target.value });
    } else {
      setSecond("0" + e.target.value);
      setTempTime({ ...tempTime, sec: "0" + e.target.value });
    }
  };

  // 타이머 시간 설정
  const handleTimerValue = (e) => {
    if (e.target.value.length >= 3) return;
    if (e.target.id === "minute") {
      setMinute(e.target.value);
      setTempTime({ ...tempTime, min: e.target.value });
      rewardPointSetByTime(e);
    } else {
      setSecond(e.target.value);
      setTempTime({ ...tempTime, sec: e.target.value });
    }
  };

  // 초(sec) 변경
  useEffect(() => {
    if (!start) return;

    const secTimer = setInterval(() => {
      setSecond((prevSecond) => {
        if (minute === "00" && prevSecond === "00") {
          return (prevSecond = "01");
        } else if (timeover) {
          if (prevSecond < 9)
            return (prevSecond = "0" + (Number(prevSecond[1]) + 1));
          if (prevSecond <= 9) return (prevSecond = 10);
          if (prevSecond < 59) return prevSecond + 1;
          return (prevSecond = "00");
        }

        if (prevSecond === "00") {
          setCountDown(false);
          return (prevSecond = 59);
        } else if (prevSecond <= 10) {
          return "0" + (prevSecond - 1);
        } else {
          return prevSecond - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(secTimer);
    };
  }, [start, minute, timeover]);

  // 분(min) 변경, 10초 카운트다운 & 타임오버 색상 효과
  useEffect(() => {
    if (!start) return;

    // 분(min) 변경
    if (second === 59) {
      if (timeover) return;
      setMinute((prevMinute) => {
        if (prevMinute <= 10) {
          return "0" + (prevMinute - 1);
        }
        return prevMinute - 1;
      });
    }

    if (second === "00") {
      if (timeover) {
        setMinute((prevMinute) => {
          if (prevMinute < 9)
            return (prevMinute = "0" + (Number(prevMinute[1]) + 1));
          if (prevMinute <= 9) return (prevMinute = 10);
          if (prevMinute >= 10) return prevMinute + 1;
        });
      }
    }

    // 색상 효과
    if (minute === "00" && second === "00") {
      setCountDown(false);
    } else if (minute === "00" && second <= 10) {
      setCountDown(true);
    }

    // 타임오버 효과
    const minus = setTimeout(() => {
      if (timeover) return;
      if (minute !== "00" || second !== "00") {
        return;
      } else {
        setTimeover(true);
        setBtnToggle(false);
      }
    }, 1000);

    // 타임오버 해제
    return () => {
      if (!timeover) return;
      if (minute !== "00" || second !== "00") return;
      clearTimeout(minus);
    };
  }, [start, second]);

  return (
    <>
      {start && (
        <div className={styles.focusSelectTimeContainer}>
          <img src="/images/icon/ic_timer.svg" alt="시계" />
          <p>
            {tempTime.min}:{tempTime.sec}
          </p>
        </div>
      )}
      <div
        className={`
          ${styles.focusTimerContainer} 
          ${timeover && styles.timeover}
          ${countDown && styles.countDown}`}
      >
        {timeover && <p>-</p>}
        <input
          onBlur={handleTimerDefault}
          onChange={handleTimerValue}
          value={minute}
          className={`${styles.focusMinTimer}`}
          id="minute"
        />
        <p>:</p>
        <input
          onBlur={handleTimerDefault}
          onChange={handleTimerValue}
          value={second}
          className={`${styles.focusSecTimer}`}
          id="second"
        />
      </div>
      <TodayFocusTimerBtn
        timeover={timeover}
        btnToggle={btnToggle}
        handleClickStart={handleClickStart}
        handleClickPause={handleClickPause}
        handleClickReset={handleClickReset}
      />
    </>
  );
};

export default TodayFocusTimer;
