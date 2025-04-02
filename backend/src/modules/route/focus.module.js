import express from "express";
import focusPointRouter from "../focus/focusPoint.module.js";

const focusRouter = express.Router();

focusRouter.use("/", focusPointRouter); // http://localhost:5090/studies/{studyId}/focus

export default focusRouter;
