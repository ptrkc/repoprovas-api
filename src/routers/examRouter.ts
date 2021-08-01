import express from "express";
import * as examController from "../controllers/examController";
const exam = express.Router();

exam.post("/", examController.post);

// exam.get("/:id", examController.findById);

export default exam;
