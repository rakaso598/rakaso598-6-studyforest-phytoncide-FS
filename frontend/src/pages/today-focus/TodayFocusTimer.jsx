import { useEffect, useState } from "react";
import styles from "./TodayFocusTimer.module.css";
import TodayFocusTimerBtn from "./TodayFocusTimerBtn";

const TodayFocusTimer = ({
  rewardPointSetByTime,
  setComplete,
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
  const [disabled, setDisabled] = useState(false);

  // 시작 버튼
  const handleStartClick = () => {
    if (!timeover && minute === "00" && second === "00") return;
    if (start) {
      setStart(false);
      setDisabled(false);
      setCountDown(false);
      setTimeover(false);
      setComplete(true);
      setMinute(tempTime.min);
      setSecond(tempTime.sec);
      return;
    }
    setStart(true);
    setBtnToggle(true);
    setDisabled(true);
  };

  // 일시 정지 버튼
  const handlePauseClick = () => {
    setPause(true);
    setStart(false);
    setCountDown(false);
    setBtnToggle(false);
  };

  // 리셋 버튼
  const handleResetClick = () => {
    setStart(false);
    setBtnToggle(false);
    setDisabled(false);
    setCountDown(false);
    setTimeover(false);
    setMinute(tempTime.min);
    setSecond(tempTime.sec);
  };

  const handleTimerClick = (e) => {
    e.target.select();
  };

  // 타이머 시간 설정
  const handleTimerInput = (e) => {
    const id = e.target.id;
    const time = e.target.value;

    if (time.includes(" ")) return;
    if (isNaN(time)) return;

    // 분(min) 설정
    if (id === "minute") {
      if (time.length >= 3) {
        setMinute("" + time.slice(-1));
      } else {
        setMinute(time);
      }
      setTempTime({ ...tempTime, min: time });
    }

    // 초(sec) 설정
    if (id === "second") {
      if (time[0] >= 6) {
        setSecond("0" + time);
        setTempTime({ ...tempTime, sec: "0" + time });
        return;
      }

      if (time.length >= 3) {
        if (time.slice(-1) >= 6) {
          setSecond("0" + time.slice(-1));
          setTempTime({ ...tempTime, sec: "0" + time.slice(-1) });
          return;
        }
        setSecond("" + time.slice(-1));
        setTempTime({ ...tempTime, sec: time });
        return;
      }

      if (time.length <= 2) {
        setSecond(time);
        setTempTime({ ...tempTime, sec: time });
        return;
      }
    }
  };

  // 타이머 디폴트 값
  const handleTimerDefaultValue = (e) => {
    const { id, value } = e.target;
    const DEFAULT_TIME_00 = "00";
    const DEFAULT_TIME_0 = "0" + value;

    if (value.length >= 2) return;

    if (id === "minute") {
      if (!minute || minute === "0") {
        setMinute(DEFAULT_TIME_00);
        setTempTime({ ...tempTime, min: DEFAULT_TIME_00 });
      } else if (Number(value) < 10) {
        setMinute(DEFAULT_TIME_0);
        setTempTime({ ...tempTime, min: DEFAULT_TIME_0 });
      }
    }

    if (id === "second") {
      if (!second || second === "0") {
        setSecond(DEFAULT_TIME_00);
        setTempTime({ ...tempTime, sec: DEFAULT_TIME_00 });
      } else if (Number(value) < 10) {
        setSecond(DEFAULT_TIME_0);
        setTempTime({ ...tempTime, sec: DEFAULT_TIME_0 });
      }
    }
  };

  // 초(sec) 변경
  useEffect(() => {
    if (!start) return;

    const secTimer = setInterval(() => {
      setSecond((prevSecond) => {
        // 초(sec) 증가
        if (timeover) {
          if (prevSecond < 9)
            return (prevSecond = "0" + (Number(prevSecond[1]) + 1));
          if (prevSecond < 10) return (prevSecond = 10);
          if (prevSecond < 59) return prevSecond + 1;
          return (prevSecond = "00");
        }

        // 초(sec) 감소
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

    // 분(min) 감소
    if (second === 59 && !timeover) {
      setMinute((prevMinute) => {
        if (prevMinute <= 10) {
          return "0" + (prevMinute - 1);
        } else {
          return prevMinute - 1;
        }
      });
    }

    // 분(min) 증가
    if (second === "00") {
      if (timeover) {
        setMinute((prevMinute) => {
          if (prevMinute < 9)
            return (prevMinute = "0" + (Number(prevMinute[1]) + 1));
          if (prevMinute < 10) return (prevMinute = 10);
          if (prevMinute < 99) return prevMinute + 1;
          if (prevMinute === 99) return (prevMinute = "00");
        });
      }
    }

    // 10초 카운트다운 색상 효과
    if (minute === "00" && second === "00") {
      setCountDown(false);
      setBtnToggle(false);
      setTimeover(true);
    } else if (minute === "00" && second <= 10) {
      setCountDown(true);
    }
  }, [start, second]);

  return (
    <>
      <div
        className={`
          ${styles.focusSelectTimeContainer} 
          ${disabled && styles.show}`}
      >
        <img src="/images/icon/ic_timer.svg" alt="시계" />
        <p>
          {tempTime.min}:{tempTime.sec}
        </p>
      </div>
      <section
        className={`
          ${styles.focusTimerContainer} 
          ${timeover && styles.timeover}
          ${countDown && styles.countDown}`}
      >
        {timeover && <p>-</p>}
        <input
          disabled={disabled}
          onClick={handleTimerClick}
          onChange={handleTimerInput}
          onBlur={(e) => {
            handleTimerDefaultValue(e);
            rewardPointSetByTime(minute);
          }}
          value={minute}
          className={`${styles.focusMinTimer}`}
          id="minute"
        />
        <p>:</p>
        <input
          disabled={disabled}
          onClick={handleTimerClick}
          onChange={handleTimerInput}
          onBlur={handleTimerDefaultValue}
          value={second}
          className={`${styles.focusSecTimer}`}
          id="second"
        />
      </section>
      <TodayFocusTimerBtn
        timeover={timeover}
        btnToggle={btnToggle}
        handleStartClick={handleStartClick}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
      />
    </>
  );
};

export default TodayFocusTimer;
