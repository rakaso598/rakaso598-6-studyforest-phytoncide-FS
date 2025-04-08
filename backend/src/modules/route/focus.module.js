import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const focusRouter = express.Router();

// 포인트 불러오기
focusRouter.get("/:studyId/focus", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);

    const point = await prisma.study.findUnique({
      where: { id: studyId },
      select: { point: true },
    });
    if (!point)
      return res
        .status(404)
        .send("잘못된 요청으로 인해 point를 불러올 수 없습니다.");

    res.json(point);
  } catch (error) {
    next(error);
  }
});

// 포인트 업데이트
focusRouter.patch("/:studyId/focus", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const { totalPoint } = req.body;

    await prisma.$transaction(async (tx) => {
      const study = await tx.study.findUnique({ where: { id: studyId } });
      if (!study)
        return res
          .status(404)
          .send("잘못된 요청으로 인해 point를 업데이트 할 수 없습니다.");

      const updatePoint = await tx.study.update({
        where: { id: studyId },
        data: { point: totalPoint },
        select: { point: true },
      });

      res.status(200).json(updatePoint);
    });
  } catch (error) {
    next(error);
  }
});

export default focusRouter;
