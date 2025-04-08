import { createContext, useContext, useState } from "react";

const TimerStateContext = createContext();

export const useTimerState = () => useContext(TimerStateContext);

export function TimerContextProvider({ children }) {
  const [timerState, setTimerState] = useState({
    isStart: false,
    isPause: false,
    isComplete: false,
    isCountDown: false,
    isTimeOver: false,
    isBtnVisible: false,
    isDisabled: false,
  });

  const value = { timerState, setTimerState };

  return (
    <TimerStateContext.Provider value={value}>
      {children}
    </TimerStateContext.Provider>
  );
}
