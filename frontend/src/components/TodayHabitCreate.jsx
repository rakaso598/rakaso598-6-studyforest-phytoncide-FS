import React from "react";
import "./TodayHabitCreate.css";
import trashIcon from "../../public/images/icon/ic_trash.svg";

const TodayHabitCreate = () => {
  return (
    <>
      <div className="habitCreateModal">
        <p className="headline">습관 목록</p>
        <div className="wholeHabitsBox">
          <div className="singleHabitBoxWithTrashIc">
            <div className="singleHabitBox">
              <p className="singleHabit">미라클모닝 6시 기상</p>
              {/* p가 인풋타입으로 바뀌는듯 */}
            </div>
            <img src={trashIcon} className="trashIcon"></img>
          </div>
          <div className="singleHabitBoxWithTrashIc">
            <div className="singleHabitBox">
              <p className="singleHabit">미라클모닝 6시 기상</p>
              {/* p가 인풋타입으로 바뀌는듯 */}
            </div>
            <img src={trashIcon} className="trashIcon"></img>
          </div>
          <div className="singleHabitBoxWithTrashIc">
            <div className="singleHabitBox">
              <p className="singleHabit">미라클모닝 6시 기상</p>
              {/* p가 인풋타입으로 바뀌는듯 */}
            </div>
            <img src={trashIcon} className="trashIcon"></img>
          </div>

          <div className="createBox">+</div>
        </div>

        <div className="Btns">
          <button className="close">취소</button>
          <button className="confirmRevision">수정 완료</button>
        </div>
      </div>
    </>
  );
};
export default TodayHabitCreate;
