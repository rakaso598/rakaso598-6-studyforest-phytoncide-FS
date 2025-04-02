import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt";

const studyUpdate = express.Router();

studyUpdate.put("/:id/update", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    console.log("스터디업데이트호출됨");
    console.log("전송된 데이터:", data); // 유효성 검사

    if (
      typeof data.nickName !== "string" ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      typeof data.encryptedPassword !== "string" ||
      typeof data.background !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "요청 데이터 형식이 올바르지 않습니다." });
    } // 비밀번호 암호화

    const hashedPassword = await (async () => {
      try {
        return await bcrypt.hash(data.encryptedPassword, 10);
      } catch (bcryptError) {
        console.error("비밀번호 암호화 실패:", bcryptError);
        res
          .status(500)
          .json({ message: "비밀번호 암호화 중 오류가 발생했습니다." });
        return null; // 오류 발생 시 null 반환
      }
    })();

    if (hashedPassword === null) {
      return; // 암호화 실패 시 응답을 이미 보냈으므로 여기서 종료
    } // 스터디 업데이트

    try {
      const updatedStudy = await prisma.study.update({
        where: { id: parseInt(id) },
        data: {
          nickName: data.nickName,
          title: data.title,
          description: data.description,
          encryptedPassword: hashedPassword,
          background: data.background,
        },
      });

      res.status(200).json({
        success: true,
        message: "스터디 정보가 성공적으로 업데이트되었습니다.",
      });
    } catch (prismaError) {
      console.error("스터디 정보 업데이트 실패:", prismaError);
      return res
        .status(500)
        .json({ message: "스터디 정보 업데이트 중 오류가 발생했습니다." });
    }
  } catch (err) {
    next(err);
  }
});

export default studyUpdate;
