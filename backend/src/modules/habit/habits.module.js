import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const includeDeletedHabit = req.query.all === "true";
    const habits = await prisma.habit.findMany({
      where: { studyId, ...(includeDeletedHabit ? {} : { isDone: false }) },
      include: { HabitDone: true },
    });
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

habitsRouter.put("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const { habits } = req.body;

    const existingHabits = await prisma.habit.findMany({
      where: { studyId: studyId },
    });

    const newHabits = habits.filter(
      (habit) => !existingHabits.some((dbHabit) => dbHabit.id === habit.id)
    );

    const updatedHabits = habits.filter((habit) => {
      const existingHabit = existingHabits.find(
        (dbHabit) => dbHabit.id === habit.id
      );
      return (
        existingHabit &&
        (existingHabit.title !== habit.title ||
          existingHabit.isDone !== habit.isDone)
      );
    });

    const deletedHabits = existingHabits.filter(
      (dbHabit) => !habits.some((habit) => habit.id === dbHabit.id)
    );

    await Promise.all([
      ...newHabits.map((habit) =>
        prisma.habit.create({
          data: { title: habit.title, isDone: habit.isDone, studyId },
        })
      ),
      ...updatedHabits.map((habit) =>
        prisma.habit.update({
          where: { id: habit.id },
          data: { title: habit.title, isDone: habit.isDone },
        })
      ),
      ...deletedHabits.map((habit) =>
        prisma.habit.delete({
          where: { id: habit.id },
        })
      ),
    ]);

    res.json({ message: "습관 목록이 성공적으로 업데이트되었습니다!" });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default habitsRouter;
