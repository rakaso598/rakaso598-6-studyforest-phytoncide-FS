import express from "express";
import prisma from "../../db/prisma/client.prisma";

const editStudyModules = express.Router();

/**
 * editStudyModules
 */
editStudyModules.post("/verify-password", async (req, res) => {
  const { password } = req.body;

  try {
    // 트랜잭션 시작

    await prisma.$transaction((tx) => {
      // 이제 어떻게 하지?

      // 1. 사용자정보 조회 ------- 특이사항 메모: 비밀번호만 주지말고 프론트에서 유저 id도 같이 갖다줘야함
      const user = tx.user.findUnique({
        where: { id: 1 }, // 사용자 id를 기반으로 DB 검색
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "사용자를 찾을 수 없습니다." });
      } // 사용자가 없는 경우 얼리리턴

      // 2. 사용자정보를 비교
      if (password === user.password) {
        // 비밀번호 일치 시 성공 응답
        return res
          .status(200)
          .json({ success: true, message: "비밀번호가 일치합니다." });
      } else {
        // 비밀번호 불일치 시 오류 응답
        return res
          .status(401)
          .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
      }
    });
  } catch (error) {
    console.error("비밀번호 검증 중 오류 발생", error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }

  // 이 예제에서는 간단하게 하드코딩된 비밀번호와 비교합니다.
  const storedPassword = "password123"; // 실제로는 DB에서 가져와야 합니다.

  if (password === storedPassword) {
    res.status(200).json({ success: true, message: "비밀번호가 일치합니다." });
  } else {
    res
      .status(401)
      .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }
});

export default editStudyModules;
