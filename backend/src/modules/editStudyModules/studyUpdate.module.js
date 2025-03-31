import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const studyUpdate = express.Router();

studyUpdate.put("/:id/update", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // 요청 데이터 유효성 검사
    if (
      !data.nickName ||
      !data.title ||
      !data.description ||
      !data.encryptedPassword ||
      !data.background
    ) {
      return res
        .status(400)
        .json({ message: "요청 데이터가 올바르지 않습니다." });
    }

    // 스터디 정보 업데이트
    const updatedStudy = await prisma.study.update({
      where: { id: parseInt(id) },
      data: {
        nickName: data.nickName,
        title: data.title,
        description: data.description,
        encryptedPassword: data.encryptedPassword,
        background: data.background,
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디 정보가 성공적으로 업데이트되었습니다.",
      updatedStudy,
    });
  } catch (err) {
    console.error(err); // 오류 로깅 추가
    return res.status(500).json({
      success: false,
      message: "스터디 정보 업데이트 중 오류가 발생했습니다.",
    });
  }
});

export default studyUpdate;
