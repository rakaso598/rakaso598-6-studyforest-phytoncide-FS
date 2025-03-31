import express from "express";
import habitsRouter from "../habitModules/habits.module.js";
import habitDoneRouter from "../habitModules/habitDone.module.js";

const habitRouter = express.Router();

habitRouter.use("/habits", habitsRouter); // http://localhost:5090/api/habits
habitRouter.use("/habitdone", habitDoneRouter);

export default habitRouter;
