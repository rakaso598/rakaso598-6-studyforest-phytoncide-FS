import React from "react";
import TodayHabitCreate from "@components/TodayHabitCreate";
const TodayHabit = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      여기는 오늘의습관 입니다.
      <TodayHabitCreate />
    </div>
  );
};

export default TodayHabit;
