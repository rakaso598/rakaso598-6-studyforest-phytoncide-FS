import express from "express";
import prisma from "../db/prisma/client.prisma.js";

const habitListRouter = express.Router();

habitListRouter.get("/", async (req, res, next) => {
  try {
    const habitlist = await prisma.habitList.findMany();
    res.status(201).json(habitlist);
  } catch (e) {
    next(e);
  }
});

export default habitListRouter;
