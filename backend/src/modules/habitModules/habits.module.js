import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/gethabit/:studyId", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const habits = await prisma.habit.findMany({ where: { studyId } });
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

habitsRouter.patch("/patchhabit/:habitId", async (req, res, next) => {
  try {
    const data = req.body;
    const habitId = Number(req.params.habitId);
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data,
    });
    if (!updatedHabit) return res.status(404).send("can't find habit");
    res.status(204).json(updatedHabit);
  } catch (e) {
    next(e);
  }
});

export default habitsRouter;
