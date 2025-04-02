import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt";

const studyUpdate = express.Router();

studyUpdate.put("/:id/update", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const saltRounds = 10; // salt 생성 시 사용할 라운드 수

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
  }

  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(
      data.encryptedPassword,
      saltRounds
    );

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
  } catch (error) {
    console.error("스터디 정보 업데이트 중 오류 발생:", error);
    if (error instanceof bcrypt.BcryptError) {
      return res
        .status(500)
        .json({ message: "비밀번호 암호화 중 오류가 발생했습니다." });
    } else if (error instanceof prisma.PrismaClientKnownRequestError) {
      // Prisma 클라이언트의 알려진 요청 에러 처리 (예: 레코드 없음)
      if (error.code === "P2025") {
        return res
          .status(404)
          .json({ message: "해당 스터디를 찾을 수 없습니다." });
      }
      return res.status(500).json({
        message: `데이터베이스 오류가 발생했습니다: ${error.message}`,
      });
    } else {
      // 기타 예상치 못한 오류 처리
      return res.status(500).json({
        message: "스터디 정보 업데이트 중 예상치 못한 오류가 발생했습니다.",
      });
    }
  }
});

export default studyUpdate;
