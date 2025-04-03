import express from "express";
import editFormVerifyPassword from "../study/editFormVerifyPassword.module.js";
import studyPatchRouter from "../study/studyPatch.module.js";
import studyGetRouter from "../study/studyGet.module.js";
import studyPostRouter from "../study/studyPost.module.js";
import studyDeleteRouter from "../study/studyDelete.module.js";
import emojiRouter from "../emoji/emojis.module.js";

const studyRouter = express.Router();

studyRouter.use(
  "/",
  studyGetRouter,
  studyPostRouter,
  studyPatchRouter,
  studyDeleteRouter,
  editFormVerifyPassword,
  emojiRouter
); // http://localhost:5090/studies
// studyRouter.use("/", postStudyRouter); // http://localhost:5090/studies
// studyRouter.use("/", studyUpdate); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyDeleteRouter); // http://localhost:5090/studies/{studyId}
// studyRouter.use("/", studyVerifyPassword); // http://localhost:5090/studies/{studyId}/verify-password
// studyRouter.use("/", emojiRouter); // http://localhost:5090/studies/${studyId}/emojis

export default studyRouter;
