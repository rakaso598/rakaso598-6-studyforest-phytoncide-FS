import express from "express";
import prisma from "../../db/prisma/client.prisma.js";
import bcrypt from "bcrypt";

const studyPostRouter = express.Router();

studyPostRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.title || !data.encryptedPassword) {
      throw new Error("제목 또는 비밀번호가 필요합니다");
    }

    if (data.nickName.length > 10 || data.title.length > 10) {
      throw new Error("10글자 이하로 적어주세요.");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPw = await bcrypt.hash(data.encryptedPassword, salt);

    const study = await prisma.study.create({
      data: {
        nickName: data.nickName,
        title: data.title,
        description: data.description,
        background: data.background,
        encryptedPassword: hashedPw,
        point: 0,
      },
      omit: {
        encryptedPassword: true,
      },
    });

    res.status(201).json(study);
  } catch (e) {
    next(e);
  }
});

export default studyPostRouter;
