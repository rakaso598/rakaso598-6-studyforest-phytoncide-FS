import express from "express";
import healthCheckRouter from "./healthCheck.module.js";
import studyVerifyPassword from "./editStudyModules/studyVerifyPassword.module.js";
import studyUpdate from "./editStudyModules/studyUpdate.module.js";

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/api", studyVerifyPassword); // http://localhost:5090/api/verify-password
router.use("/api", studyUpdate); // http://localhost:5090/api/study/{studyId}/update

export default router;
