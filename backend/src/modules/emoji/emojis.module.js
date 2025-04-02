import prisma from "../../db/prisma/client.prisma.js";
import express from "express";
const emojiRouter = express.Router();

// 이모지 저장 API (POST 요청 - 기존 코드 유지)
emojiRouter.post("/:id/emojis", async (req, res) => {
  const { id } = req.params;
  const { emojis } = req.body;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });

    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    await prisma.emojis.deleteMany({
      where: { studyId: parseInt(id) },
    });

    const createEmojiPromises = emojis.map(async ([emojiContent, count]) => {
      return prisma.emojis.create({
        data: {
          studyId: parseInt(id),
          emojiContent,
          count,
        },
      });
    });

    await Promise.all(createEmojiPromises);

    res.status(200).json({ message: "이모지 데이터가 저장되었습니다." });
  } catch (error) {
    console.error("이모지 데이터 저장 오류:", error);
    res
      .status(500)
      .json({ message: "이모지 데이터 저장 중 오류가 발생했습니다." });
  }
});

// 이모지 불러오기 API (GET 요청 - 새로 추가)
emojiRouter.get("/:id/emojis", async (req, res) => {
  const { id } = req.params;

  try {
    const studyExists = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });

    if (!studyExists) {
      return res
        .status(404)
        .json({ message: "해당 스터디를 찾을 수 없습니다." });
    }

    const emojis = await prisma.emojis.findMany({
      where: { studyId: parseInt(id) },
      select: {
        emojiContent: true,
        count: true,
        id: false,
        studyId: false,
      },
    });

    res.status(200).json(emojis);
  } catch (error) {
    console.error("이모지 데이터 불러오기 오류:", error);
    res
      .status(500)
      .json({ message: "이모지 데이터 불러오기 중 오류가 발생했습니다." });
  }
});

export default emojiRouter;
