import express from "express";
import * as examController from "../controllers/examController";
const exam = express.Router();

exam.post("/", examController.post);

exam.get("/:id", examController.findById);

exam.get("/professor/:id", examController.findByProfessorId);

exam.get("/discipline/:id", examController.findByDisciplineId);

export default exam;
