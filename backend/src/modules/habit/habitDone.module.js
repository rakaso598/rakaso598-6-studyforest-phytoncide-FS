import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitDoneRouter = express.Router();

habitDoneRouter.get(
  "/:studyId/habits/:habitId/:day",
  async (req, res, next) => {
    try {
      const habitId = Number(req.params.habitId);
      const day = new Date(req.params.day);
      const habits = await prisma.habitDone.findFirst({
        where: { habitId, createdAt: day },
      });
      res.status(201).json(habits);
    } catch (e) {
      next(e);
    }
  }
);

habitDoneRouter.put(
  "/:studyId/habits/:habitId/:day", //2025-04-04
  async (req, res, next) => {
    try {
      const habitId = Number(req.params.habitId);
      const day = new Date(req.params.day);
      await prisma.$transaction(async (tx) => {
        const habitDone = await tx.habitDone.findFirst({
          where: { habitId, createdAt: day },
        });
        if (habitDone) {
          await tx.habitDone.delete({ where: { id: habitDone.id } });
        } else {
          await tx.habitDone.create({
            data: { habitId },
          });
        }
      });
      res.status(200).send("OK");
    } catch (e) {
      next(e);
    }
  }
);

export default habitDoneRouter;
