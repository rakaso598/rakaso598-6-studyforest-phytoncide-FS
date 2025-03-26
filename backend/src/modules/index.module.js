import express from "express";
import healthCheckRouter from "./healthCheck.module.js";
import editStudyModules from "./editStudyModules/editStudy.module.js";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/api", editStudyModules);

export default router;
