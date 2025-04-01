import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const studyUpdate = express.Router();

studyUpdate.put("/:id/update", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    console.log("스터디업데이트호출됨");
    // 유효성 검사
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

    // 스터디 업데이트
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
    });
  } catch (err) {
    next(err);
  }
});

export default studyUpdate;
