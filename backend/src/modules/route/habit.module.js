import express from "express";
import habitsRouter from "../habit-modules/habits.module.js";
import habitDoneRouter from "../habit-modules/habitDone.module.js";

const habitRouter = express.Router();

habitRouter.use("/habits", habitsRouter); // http://localhost:5090/api/habits
habitRouter.use("/habitdone", habitDoneRouter);

export default habitRouter;
