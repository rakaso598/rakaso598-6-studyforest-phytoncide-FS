import express from "express";
import prisma from "@prisma/client";

const habitsRouter = express.Router();

habitsRouter.get("/", async (req, res, next) => {
  try {
    const habits = await prisma.habit.findMany();
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

habitsRouter.post("/", async (req, res, next) => {
  try {
    const { title, studyId } = req.body;
    const habit = await prisma.habit.create({
      data: { title, studyId },
    });
    res.json(habit);
  } catch (e) {
    next(e);
  }
});

export default habitsRouter;
