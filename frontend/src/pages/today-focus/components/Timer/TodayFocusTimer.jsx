import { useEffect, useState } from "react";
import styles from "./TodayFocusTimer.module.css";
import TodayFocusTimerBtn from "./TodayFocusTimerBtn";
import clsx from "clsx";
import { minTimerLogic, secTimerLogic } from "@utils/timerLogic.utils";
import { useTimerState } from "@contexts/timerState.context";

const TodayFocusTimer = ({ rewardPointSetByTime }) => {
  const { timerState, setTimerState } = useTimerState();
  const { isStart, isCountDown, isTimeOver, isDisabled } = timerState;
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [tempTime, setTempTime] = useState({ min: "00", sec: "00" });

  // 타이머 선택 시 자동 전체 선택
  const handleTimerClick = (e) => {
    e.target.select();
  };

  // 타이머 리셋
  const resetTimer = () => {
    setMinute(tempTime.min);
    setSecond(tempTime.sec);
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

  // 타이머 시작 - 초(sec) 변경
  useEffect(() => {
    if (!isStart) return;

    const secTimer = secTimerLogic(isTimeOver, setSecond);

    return () => {
      clearInterval(secTimer);
    };
  }, [isStart, minute, isTimeOver]);

  // 타이머 시작 - 분(min) 변경
  useEffect(() => {
    if (!isStart) return;

    minTimerLogic(isTimeOver, second, setMinute);

    // 10초 & 타임오버 색상 효과
    if (minute === "00") {
      if (second === "00") {
        setTimerState((prevState) => ({
          ...prevState,
          isCountDown: false,
          isBtnVisible: false,
          isTimeOver: true,
        }));
      } else if (second <= 10) {
        setTimerState((prevState) => ({ ...prevState, isCountDown: true }));
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
          isTimeOver && styles.timeover,
          isCountDown && styles.countDown
        )}
      >
        {isTimeOver && <p>-</p>}
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
        minute={minute}
        second={second}
        resetTimer={resetTimer}
      />
    </>
  );
};

export default TodayFocusTimer;
