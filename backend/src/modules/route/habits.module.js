import express from "express";
import prisma from "../../db/prisma/client.prisma.js";

const habitRouter = express.Router();

// 습관 조회
habitRouter.get("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const includeDeletedHabit = req.query.all === "true";
    const habits = await prisma.habit.findMany({
      where: { studyId, ...(includeDeletedHabit ? {} : { isDeleted: false }) },
      include: { HabitDone: true },
    });
    res.status(201).json(habits);
  } catch (error) {
    next(error);
  }
});

// 습관 상세조회
habitRouter.get("/:studyId/habits/:habitId", async (req, res, next) => {
  try {
    const habitId = Number(req.params.habitId);
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) return res.status(404).send("해당 습관이 존재하지 않습니다");
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

// 습관 수정
habitRouter.put("/:studyId/habits", async (req, res, next) => {
  try {
    const studyId = Number(req.params.studyId);
    const { habits } = req.body;

    const existingHabits = await prisma.habit.findMany({
      where: { studyId: studyId },
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
          existingHabit.isDeleted !== habit.isDeleted)
      );
    });

    const deletedHabits = existingHabits.filter(
      (dbHabit) => !habits.some((habit) => habit.id === dbHabit.id)
    );

    const createHabitsPromises = newHabits.map((habit) =>
      prisma.habit.create({
        data: { title: habit.title, isDeleted: habit.isDeleted, studyId },
      })
    );
    const updateHabitsPromises = updatedHabits.map((habit) =>
      prisma.habit.update({
        where: { id: habit.id },
        data: { title: habit.title, isDeleted: habit.isDeleted },
      })
    );

    const deleteHabitsPromises = deletedHabits.map((habit) =>
      prisma.habit.update({
        where: { id: habit.id },
        data: { isDeleted: true },
      })
    );

    await Promise.all([
      ...createHabitsPromises,
      ...updateHabitsPromises,
      ...deleteHabitsPromises,
    ]);

    res.json({ message: "습관 목록이 성공적으로 업데이트되었습니다!" });
  } catch (error) {
    next(error);
  }
});

// 습관 체크
habitRouter.put("/:studyId/habits/:habitId/:day", async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

export default habitRouter;
