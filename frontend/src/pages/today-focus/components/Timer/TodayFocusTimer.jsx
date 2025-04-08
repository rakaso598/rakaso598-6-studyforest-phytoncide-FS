import { useEffect, useState } from "react";
import styles from "./TodayFocusTimer.module.css";
import TodayFocusTimerBtn from "./TodayFocusTimerBtn";
import clsx from "clsx";
import { minTimerLogic, secTimerLogic } from "@utils/timerLogic.utils";

const TodayFocusTimer = ({
  rewardPointSetByTime,
  setIsComplete,
  setIsPause,
  isStart,
  setIsStart,
}) => {
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [tempTime, setTempTime] = useState({ min: "00", sec: "00" });
  const [isCountDown, setIsCountDown] = useState(false);
  const [isTimeover, setIsTimeover] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 시작 버튼
  const handleStartClick = () => {
    if (!isTimeover && minute === "00" && second === "00") return;
    if (isStart) {
      setIsStart(false);
      setIsDisabled(false);
      setIsCountDown(false);
      setIsTimeover(false);
      setIsComplete(true);
      setMinute(tempTime.min);
      setSecond(tempTime.sec);
      return;
    }
    setIsStart(true);
    setIsBtnVisible(true);
    setIsDisabled(true);
  };

  // 일시 정지 버튼
  const handlePauseClick = () => {
    setIsPause(true);
    setIsStart(false);
    setIsBtnVisible(false);
  };

  // 리셋 버튼
  const handleResetClick = () => {
    setIsStart(false);
    setIsBtnVisible(false);
    setIsDisabled(false);
    setIsCountDown(false);
    setIsTimeover(false);
    setMinute(tempTime.min);
    setSecond(tempTime.sec);
  };

  // 타이머 선택 시 자동 전체 선택
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
    const DEFAULT_TIME = value.padStart(2, "0");

    if (value.length >= 2) return;

    if (id === "minute") {
      if (!minute || minute === "0") {
        setMinute(DEFAULT_TIME);
        setTempTime({ ...tempTime, min: DEFAULT_TIME });
      } else if (Number(value) < 10) {
        setMinute(DEFAULT_TIME);
        setTempTime({ ...tempTime, min: DEFAULT_TIME });
      }
    }

    if (id === "second") {
      if (!second || second === "0") {
        setSecond(DEFAULT_TIME);
        setTempTime({ ...tempTime, sec: DEFAULT_TIME });
      } else if (Number(value) < 10) {
        setSecond(DEFAULT_TIME);
        setTempTime({ ...tempTime, sec: DEFAULT_TIME });
      }
    }
  };

  // 초(sec) 변경
  useEffect(() => {
    if (!isStart) return;

    const secTimer = secTimerLogic(isTimeover, setSecond);

    return () => {
      clearInterval(secTimer);
    };
  }, [isStart, minute, isTimeover]);

  // 분(min) 변경
  useEffect(() => {
    if (!isStart) return;

    minTimerLogic(isTimeover, second, setMinute);

    // 10초 & 타임오버 색상 효과
    if (minute === "00") {
      if (second === "00") {
        setIsCountDown(false);
        setIsBtnVisible(false);
        setIsTimeover(true);
      } else if (second <= 10) {
        setIsCountDown(true);
      }
    }
  }, [second]);

  return (
    <>
      <div
        className={clsx(
          styles.focusSelectTimeContainer,
          isDisabled && styles.show
        )}
      >
        <img src="/images/icon/ic_timer.svg" alt="시계" />
        <p>
          {tempTime.min}:{tempTime.sec}
        </p>
      </div>
      <section
        className={clsx(
          styles.focusTimerContainer,
          isTimeover && styles.timeover,
          isCountDown && styles.countDown
        )}
      >
        {isTimeover && <p>-</p>}
        <input
          disabled={isDisabled}
          onClick={handleTimerClick}
          onChange={handleTimerInput}
          onBlur={(e) => {
            handleTimerDefaultValue(e);
            rewardPointSetByTime(minute);
          }}
          value={minute}
          className={styles.focusMinTimer}
          id="minute"
        />
        <p>:</p>
        <input
          disabled={isDisabled}
          onClick={handleTimerClick}
          onChange={handleTimerInput}
          onBlur={handleTimerDefaultValue}
          value={second}
          className={styles.focusSecTimer}
          id="second"
        />
      </section>
      <TodayFocusTimerBtn
        isTimeover={isTimeover}
        isBtnVisible={isBtnVisible}
        handleStartClick={handleStartClick}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
      />
    </>
  );
};

export default TodayFocusTimer;
