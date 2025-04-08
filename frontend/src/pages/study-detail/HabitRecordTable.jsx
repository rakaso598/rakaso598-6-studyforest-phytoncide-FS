import React, { useState, useEffect } from "react";
import styles from "./HabitRecordTable.module.css";
import stickerWhite from "/images/stickers/sticker-white.svg";
import stickerBlue100 from "/images/stickers/sticker-blue-100.svg";
import stickerBlue200 from "/images/stickers/sticker-blue-200.svg";
import stickerBlue300 from "/images/stickers/sticker-blue-300.svg";
import stickerBlue400 from "/images/stickers/sticker-blue-400.svg";
import stickerBlue500 from "/images/stickers/sticker-blue-500.svg";
import stickerGreen100 from "/images/stickers/sticker-green-100.svg";
import stickerGreen200 from "/images/stickers/sticker-green-200.svg";
import stickerGreen300 from "/images/stickers/sticker-green-300.svg";
import stickerGreen400 from "/images/stickers/sticker-green-400.svg";
import stickerOrange100 from "/images/stickers/sticker-orange-100.svg";
import stickerOrange200 from "/images/stickers/sticker-orange-200.svg";
import stickerOrange300 from "/images/stickers/sticker-orange-300.svg";
import stickerPink100 from "/images/stickers/sticker-pink-100.svg";
import stickerPink200 from "/images/stickers/sticker-pink-200.svg";
import stickerPink300 from "/images/stickers/sticker-pink-300.svg";
import stickerPink400 from "/images/stickers/sticker-pink-400.svg";
import stickerPurple100 from "/images/stickers/sticker-purple-100.svg";
import stickerPurple200 from "/images/stickers/sticker-purple-200.svg";
import { useParams } from "react-router-dom";
import { getAllHabits } from "@api/habit/habit.api";
import { getCurrentWeekDates } from "@utils/dateUtils";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const allStickers = [
  stickerBlue100,
  stickerBlue200,
  stickerBlue300,
  stickerBlue400,
  stickerBlue500,
  stickerGreen100,
  stickerGreen200,
  stickerGreen300,
  stickerGreen400,
  stickerOrange100,
  stickerOrange200,
  stickerOrange300,
  stickerPink100,
  stickerPink200,
  stickerPink300,
  stickerPink400,
  stickerPurple100,
  stickerPurple200,
];

function HabitRecordTable() {
  const { studyId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [habitCompletions, setHabitCompletions] = useState({});

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const habitData = await getAllHabits(studyId);
        setHabits(habitData);

        const weekDates = getCurrentWeekDates();
        setCurrentWeekDates(weekDates);

        const completions = processHabitCompletions(habitData, weekDates);
        setHabitCompletions(completions);
      } catch (error) {
        console.error("Habit 데이터 가져오는데 에러발생:", error);
      } finally {
        setLoading(false);
      }
    };

    if (studyId) {
      fetchHabits();
    }
  }, [studyId]);

  const processHabitCompletions = (habits, weekDates) => {
    const completions = {};

    habits.forEach((habit) => {
      completions[habit.id] = {};

      weekDates.forEach((date) => {
        completions[habit.id][date] = false;
      });

      if (habit.HabitDone.length > 0) {
        habit.HabitDone.forEach((done) => {
          const doneDate =
            done.createdAt instanceof Date
              ? done.createdAt.toISOString().split("T")[0]
              : String(done.createdAt).split("T")[0];

          if (weekDates.includes(doneDate)) {
            completions[habit.id][doneDate] = true;
          }
        });
      }
    });

    return completions;
  };

  const getStickerForRow = (rowIndex) => {
    const stickerIndex = rowIndex % allStickers.length;
    return allStickers[stickerIndex];
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>습관 기록표</h1>

      {habits.length === 0 ? (
        <div className={styles.noHabitsContainer}>
          <p className={styles.noHabitsMessage}>
            아직 습관이 없어요
            <br />
            오늘의 습관에서 습관을 생성해보세요
          </p>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.headerRow}>
            <div className={styles.emptyHeaderCell}></div>
            <div className={styles.daysHeader}>
              {days.map((day, index) => (
                <div key={`day-${index}`} className={styles.dayCell}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          {habits.map((habit, rowIndex) => (
            <div key={`habit-${rowIndex}`} className={styles.habitRow}>
              <div className={styles.habitNameCell}>{habit.title}</div>
              <div className={styles.statusCells}>
                {days.map((_, dayIndex) => {
                  const dateForDay = currentWeekDates[dayIndex];
                  const isCompleted =
                    habitCompletions[habit.id] &&
                    habitCompletions[habit.id][dateForDay];

                  return (
                    <div
                      key={`status-${rowIndex}-${dayIndex}`}
                      className={styles.statusCell}
                    >
                      <div className={styles.stickerWrapper}>
                        <img
                          src={
                            isCompleted
                              ? getStickerForRow(rowIndex)
                              : stickerWhite
                          }
                          alt="Sticker"
                          className={styles.sticker}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HabitRecordTable;
