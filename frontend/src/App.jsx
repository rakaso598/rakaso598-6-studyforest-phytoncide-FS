import React from "react";
import { Routes, Route } from "react-router-dom";
import "../public/font/Pretendard-1.3.9/web/static/pretendard.css";
import Home from "@home/Home";
import TodayFocus from "@today-focus/TodayFocus";
import TodayHabit from "@today-habit/TodayHabit";
import StudyDetail from "@study-detail/StudyDetail";
import StudyCreate from "@study-create/StudyCreate";
import StudyEditForm from "@study-detail/study-edit-form/StudyEditForm";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/study/*">
            <Route path="create" element={<StudyCreate />} />
            <Route path=":studyId" element={<StudyDetail />} />
            <Route path=":studyId/form" element={<StudyEditForm />} />
            <Route path=":studyId/focus" element={<TodayFocus />} />
            <Route path=":studyId/habit" element={<TodayHabit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
