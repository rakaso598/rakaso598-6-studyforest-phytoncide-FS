import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt";

const studyDeleteRouter = express.Router();

studyDeleteRouter.delete("/:id/delete", async (req, res, next) => {
  try {
    console.log("study delete 호출됨");
    const { id } = req.params;
    const { password } = req.body;
    const study = await prisma.study.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!study) {
      return res.status(404).json({ message: "스터디를 찾을 수 없습니다." });
    }

    // bcrypt로 평문 비밀번호와 저장된, 이미 암호화된 비밀번호 비교
    const passwordMatch = await bcrypt.compare(
      password, // 사용자가 입력한 평문 비밀번호
      study.encryptedPassword // DB에 저장된 암호화된 비밀번호
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 비밀번호 확인 되었으므로 삭제 실행
    await prisma.study.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디가 성공적으로 삭제되었습니다",
    });
  } catch (err) {
    console.error("스터디 삭제 오류:", err);
    next(err);
  }
});

export default studyDeleteRouter;
