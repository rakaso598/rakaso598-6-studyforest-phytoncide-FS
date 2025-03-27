import express from "express";
import healthCheckRouter from "./healthCheck.module.js";
import editStudyModules from "./editStudyModules/editStudy.module.js";
import habitsRouter from "./habits.module.js";
import habitListRouter from "./habitList.module.js";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/habits", habitsRouter);
router.use("/habitlist", habitListRouter);
router.use("/api", editStudyModules);

export default router;
