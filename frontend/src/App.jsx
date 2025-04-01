import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../public/font/Pretendard-1.3.9/web/static/pretendard.css';
import Header from './layout/Header';
import Home from '@home/Home';
import TodayFocus from '@today-focus/TodayFocus';
import TodayHabit from '@today-habit/TodayHabit';
import StudyDetail from '@study-detail/StudyDetail';
import StudyCreate from '@study-create/StudyCreate';
import StudyEditForm from '@study-detail/study-edit-form/StudyEditForm';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study/*">
            <Route path="create" element={<StudyCreate />} />
            <Route path=":id" element={<StudyDetail />} />
            <Route path=":id/form" element={<StudyEditForm />} />
            <Route path=":id/focus" element={<TodayFocus />} />
            <Route path=":id/habit" element={<TodayHabit />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
