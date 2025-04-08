export function secTimerLogic(isTimeover, setSecond) {
  const secTimer = setInterval(() => {
    setSecond((prevSecond) => {
      // 초(sec) 감소
      if (!isTimeover) {
        if (prevSecond === "00") return 59;
        if (prevSecond <= 10) return "0" + (prevSecond - 1);
        if (prevSecond <= 59) return prevSecond - 1;
      }

      // 초(sec) 증가
      if (isTimeover) {
        if (prevSecond < 9) return "0" + (Number(prevSecond.slice(-1)) + 1);
        if (prevSecond < 10) return 10;
        if (prevSecond < 59) return prevSecond + 1;
        return "00";
      }
    });
  }, 1000);

  return secTimer;
}

export function minTimerLogic(isTimeover, second, setMinute) {
  // 분(min) 감소
  if (second === 59 && !isTimeover) {
    setMinute((prevMinute) => {
      if (prevMinute <= 10) return "0" + (prevMinute - 1);
      return prevMinute - 1;
    });
  }

  // 분(min) 증가
  if (second === "00" && isTimeover) {
    setMinute((prevMinute) => {
      if (prevMinute < 9) return "0" + (Number(prevMinute.slice(-1)) + 1);
      if (prevMinute < 10) return 10;
      if (prevMinute < 99) return prevMinute + 1;
      if (prevMinute === 99) return "00";
    });
  }
}
