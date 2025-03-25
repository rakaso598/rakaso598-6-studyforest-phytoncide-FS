import express from "express";

const editStudyModules = express.Router();

/**
 * editStudyModules
 */
editStudyModules.post('/verify-password', (req, res) => {
  const { password } = req.body;

  // TODO: DB에서 비밀번호를 조회하고 입력된 비밀번호와 비교하는 로직을 구현합니다.
  // 이 예제에서는 간단하게 하드코딩된 비밀번호와 비교합니다.
  const storedPassword = 'password123'; // 실제로는 DB에서 가져와야 합니다.

  if (password === storedPassword) {
    res.status(200).json({ success: true, message: '비밀번호가 일치합니다.' });
  } else {
    res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
  }
});

export default editStudyModules;
