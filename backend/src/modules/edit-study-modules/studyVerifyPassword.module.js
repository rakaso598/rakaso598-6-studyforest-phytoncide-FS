import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt"; // bcrypt 추가

const studyVerifyPassword = express.Router();

studyVerifyPassword.post("/:id/verify-password", async (req, res, next) => {
  const { id } = req.params; // Request Param으로 id 가져오기
  const { encryptedPassword } = req.body; // Request Body에서 encryptedPassword 가져오기

  try {
    const study = await prisma.study.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "스터디를 찾을 수 없습니다.",
      });
    }

    // bcrypt.compare()를 사용하여 평문 비밀번호와 암호화된 비밀번호 비교
    const isPasswordMatch = await bcrypt.compare(
      encryptedPassword,
      study.encryptedPassword
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    res.status(200).json({ success: true, message: "비밀번호가 일치합니다." });
  } catch (err) {
    next(err);
  }
});

export default studyVerifyPassword;
