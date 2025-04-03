import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt";

const studyPatchRouter = express.Router();
const SALT_ROUNDS = 10;

studyPatchRouter.patch("/:studyId/update", async (req, res) => {
  const { studyId } = req.params;
  const { nickName, title, description, encryptedPassword, background } =
    req.body;

  if (
    typeof nickName !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof encryptedPassword !== "string" ||
    typeof background !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "요청 데이터 형식이 올바르지 않습니다." });
  }

  try {
    const hashedPassword = await bcrypt.hash(encryptedPassword, SALT_ROUNDS);

    await prisma.study.update({
      where: { id: parseInt(studyId) },
      data: {
        nickName,
        title,
        description,
        encryptedPassword: hashedPassword,
        background,
      },
    });

    res.status(200).json({
      success: true,
      message: "스터디 정보가 성공적으로 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("스터디 정보 업데이트 중 오류 발생:", error);

    if (error instanceof prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        message: `데이터베이스 오류가 발생했습니다: ${error.message}`,
      });
    }

    return res.status(500).json({
      message: "스터디 정보 업데이트 중 예상치 못한 오류가 발생했습니다.",
    });
  }
});

export default studyPatchRouter;
