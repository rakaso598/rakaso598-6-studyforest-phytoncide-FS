import express from "express";
import habitsRouter from "../habit/habits.module.js";
import habitDoneRouter from "../habit/habitDone.module.js";

const habitRouter = express.Router();

// habit-modules 디렉토리명을 habit으로 변경하려고 하는데 괜찮을까요?
habitRouter.use("/", habitsRouter); // http://localhost:5090/studies/{studyId}/ habit은 제가 잘 몰라서 뒤에 경로는 나중에 직접 적어주세요!
habitRouter.use("/", habitDoneRouter); // http://localhost:5090/studies/{studyId}/ habit은 제가 잘 몰라서 뒤에 경로는 나중에 직접 적어주세요!

export default habitRouter;
