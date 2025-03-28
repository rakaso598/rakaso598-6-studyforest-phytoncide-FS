import express from "express";
import habitsRouter from "../habitModules/habits.module.js";

const habitRouter = express.Router();

habitRouter.use("/habits", habitsRouter); // http://localhost:5090/api/habits

export default habitRouter;
