import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const focusPointRouter = express.Router();

// 포인트 불러오기
focusPointRouter.get("/:id/focus", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const point = await prisma.study.findUnique({
      where: { id },
      select: { point: true },
    });
    if (!point)
      return res
        .status(404)
        .send("잘못된 요청으로 인해 point를 불러올 수 없습니다.");

    res.json(point);
  } catch (e) {
    next(e);
  }
});

// 포인트 업데이트
focusPointRouter.patch("/:id/focus", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { totalPoint } = req.body;

    await prisma.$transaction(async (tx) => {
      const study = await tx.study.findUnique({ where: { id } });
      if (!study)
        return res
          .status(404)
          .send("잘못된 요청으로 인해 point를 업데이트 할 수 없습니다.");

      const updatePoint = await tx.study.update({
        where: { id },
        data: { point: totalPoint },
        select: { point: true },
      });

      res.status(200).json(updatePoint);
    });
  } catch (e) {
    next(e);
  }
});

export default focusPointRouter;
