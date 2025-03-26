import express from "express";
import prisma from "../db/prisma/client.prisma.js";

const habitsRouter = express.Router();

habitsRouter.get("/", async (req, res, next) => {
  try {
    const habits = await prisma.habit.findMany();
    res.status(201).json(habits);
  } catch (e) {
    next(e);
  }
});

export default habitsRouter;
