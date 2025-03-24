import React from "react";
import { Link } from "react-router-dom";

const TodayHabit = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <p>title</p>
            <Link></Link>
          </div>
          <div>
            <p>현재 시간</p>
            <div>time</div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>오늘의 습관</p>
              <p>목록 수정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHabit;
