import express from "express";
import prisma from "../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/:studyId", async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const habits = await prisma.habit.findMany({ where: { studyId } });
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

export default habitsRouter;
