import express from "express";
import studyVerifyPassword from "../edit-study-modules/studyVerifyPassword.module.js";
import studyUpdate from "../edit-study-modules/studyUpdate.module.js";
import studyGetRouter from "../study/studyGet.module.js";
import postStudyRouter from "../study/postStudy.module.js";
import studyDeleteRouter from "../study/studyDelete.module.js";
import emojiRouter from "../emoji/emojis.module.js";

const studyRouter = express.Router();

studyRouter.use(
  "/",
  studyGetRouter,
  postStudyRouter,
  studyUpdate,
  studyDeleteRouter,
  studyVerifyPassword,
  emojiRouter
); // http://localhost:5090/studies
// studyRouter.use("/", postStudyRouter); // http://localhost:5090/studies
// studyRouter.use("/", studyUpdate); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyDeleteRouter); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyVerifyPassword); // http://localhost:5090/studies/{studyId}/verify-password
// studyRouter.use("/", emojiRouter); // http://localhost:5090/studies/${studyId}/emojis

export default studyRouter;
