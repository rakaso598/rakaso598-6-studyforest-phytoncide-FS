import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const includeDeletedHabit = req.query.all === "true";
    const habits = await prisma.habit.findMany({
      where: { studyId, ...(includeDeletedHabit ? {} : { isDeleted: false }) },
      include: { HabitDone: true },
    });
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});
habitsRouter.get("/:studyId/habits/:habitId", async (req, res, next) => {
  try {
    const habitId = Number(req.params.habitId);
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) return res.status(404).send("해당 습관이 존재하지 않습니다");
    res.status(200).json(habit);
  } catch (e) {
    next(e);
  }
});

habitsRouter.put("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const { habits } = req.body; //요청 해빗

    const existingHabits = await prisma.habit.findMany({
      where: { studyId: studyId }, //디비존재해빗
    });

    const newHabits = habits.filter(
      (habit) =>
        habit.title &&
        habit.title.trim() !== "" &&
        !existingHabits.some((dbHabit) => dbHabit.id === habit.id)
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
        prisma.habit.update({
          where: { id: habit.id },
          data: { isDone: true },
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
