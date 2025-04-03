import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const includeDeletedHabit = req.query.all === "true";
    const habits = await prisma.habit.findMany({
      where: { studyId, ...(includeDeletedHabit ? {} : { isDone: false }) },
    });
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

habitsRouter.patch("/:studyId/habits/:habitId", async (req, res, next) => {
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

habitsRouter.post("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const { title } = req.body;
    const habit = await prisma.habit.create({
      data: { title, studyId },
    });
    res.json(habit);
  } catch (e) {
    next(e);
  }
});

habitsRouter.delete("/:studyId/habits/:habitId", async (req, res, next) => {
  try {
    const habitId = Number(req.params.habitId);
    const deletedHabit = await prisma.habit.delete({
      where: { id: habitId },
    });
    res.json(deletedHabit);
  } catch (e) {
    next(e);
  }
});
export default habitsRouter;
