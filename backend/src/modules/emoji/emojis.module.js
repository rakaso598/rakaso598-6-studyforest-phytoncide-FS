import prisma from "../../db/prisma/client.prisma.js";
import express from "express";
const emojiRouter = express.Router();

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
        // return 추가
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
    console.error("오류 상세:", error.message); // 더 자세한 오류 메시지 출력
    console.error("스택 트레이스:", error.stack); // 스택 트레이스 출력
    res
      .status(500)
      .json({ message: "이모지 데이터 저장 중 오류가 발생했습니다." });
  }
});

export default emojiRouter;
