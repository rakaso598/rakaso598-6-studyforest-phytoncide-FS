import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "../public/font/Pretendard-1.3.9/web/static/pretendard.css";
import Layout from "./layout/Layout";

const Home = lazy(() => import("@home/Home"));
const TodayFocus = lazy(() => import("@today-focus/TodayFocus"));
const TodayHabit = lazy(() => import("@today-habit/TodayHabit"));
const StudyDetail = lazy(() => import("@study-detail/StudyDetail"));
const StudyCreate = lazy(() => import("@study-create/StudyCreate"));
const StudyEditForm = lazy(() =>
  import("@study-detail/study-edit-form/StudyEditForm")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
