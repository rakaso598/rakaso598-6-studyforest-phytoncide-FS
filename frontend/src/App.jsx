import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "../public/font/Pretendard-1.3.9/web/static/pretendard.css";
import Layout from "./layout/Layout";
import { ClipLoader, SyncLoader } from "react-spinners";
import styles from "./App.module.css";
import { TimerContextProvider } from "./contexts/timerState.context";

const Home = lazy(() => import("@home/Home"));
const TodayFocus = lazy(() => import("@today-focus/TodayFocus"));
const TodayHabit = lazy(() => import("@today-habit/TodayHabit"));
const StudyDetail = lazy(() => import("@study-detail/StudyDetail"));
const StudyCreate = lazy(() => import("@study-create/StudyCreate"));
const StudyEditForm = lazy(() =>
  import("@study-detail/components/study-edit-form/StudyEditForm")
);

function App() {
  return (
    <Suspense
      fallback={
        <div className={styles.skeletonContainer}>
          데이터를 불러오는 중이에요
          <SyncLoader size={8} loading={true} color="#99c08e" />
        </div>
      }
    >
      <TimerContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/studies/*">
              <Route path="create" element={<StudyCreate />} />
              <Route path=":studyId" element={<StudyDetail />} />
              <Route path=":studyId/form" element={<StudyEditForm />} />
              <Route path=":studyId/focus" element={<TodayFocus />} />
              <Route path=":studyId/habit" element={<TodayHabit />} />
            </Route>
          </Route>
        </Routes>
      </TimerContextProvider>
    </Suspense>
  );
}

export default App;
