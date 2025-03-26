import express from "express";
import healthCheckRouter from "./healthCheck.module.js"; // Assuming healthCheck.module.js is an ES module
import habitsRouter from "./habits.module.js";
import habitListRouter from "./habitList.module.js";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/habits", habitsRouter);
router.use("/habitlist", habitListRouter);

export default router;
