import express from "express";
import studyRouter from "./route/studies.module.js";
import focusRouter from "./route/focus.module.js";
import habitRouter from "./route/habits.module.js";

const router = express.Router();

router.use("/studies", studyRouter);
router.use("/studies", focusRouter);
router.use("/studies", habitRouter);

export default router;
