import express from "express";
import focusPointRouter from "../focus/focustPoint.module.js";

const focusRouter = express.Router();

focusRouter.use("/studies", focusPointRouter); // http://localhost:5090/api/study/:studyId/focus

export default focusRouter;
