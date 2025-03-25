import express from "express";
import healthCheckRouter from "./healthCheck.module.js"; // Assuming healthCheck.module.js is an ES module

const router = express.Router();

router.use("/health-check", healthCheckRouter);

export default router;
