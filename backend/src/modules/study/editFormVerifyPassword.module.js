import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const editFormVerifyPassword = express.Router();

editFormVerifyPassword.post(
  "/:studyId/verify-password",
  async (req, res, next) => {
    const { studyId } = req.params;
    const { encryptedPassword } = req.body;

    try {
      const study = await prisma.study.findUnique({
        where: {
          id: parseInt(studyId),
        },
      });

      if (!study) {
        return res.status(404).json({
          success: false,
          message: "스터디를 찾을 수 없습니다.",
        });
      }

      // 비밀번호 비교 로직 (bcrypt 관련 코드 삭제됨)
      // 실제 비밀번호 비교 로직은 여기에 구현해야 합니다.
      const isPasswordMatch = encryptedPassword === study.encryptedPassword; // 임시 비교 (주의: 실제 운영 환경에서는 안전하지 않음)

      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "비밀번호가 일치합니다." });
    } catch (err) {
      next(err);
    }
  }
);

export default editFormVerifyPassword;
