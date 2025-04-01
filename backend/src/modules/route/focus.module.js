import express from "express";
import focusPointRouter from "../focusPointModules/focustPoint.module.js";

const focusRouter = express.Router();

focusRouter.use("/study", focusPointRouter); // http://localhost:5090/api/study/:studyId/focus

export default focusRouter;
