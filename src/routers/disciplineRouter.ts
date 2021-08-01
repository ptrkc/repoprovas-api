import express from "express";
import * as disciplineController from "../controllers/disciplineController";
const discipline = express.Router();

discipline.get("/", disciplineController.find);

discipline.get("/professors", disciplineController.findWithProfessors);

discipline.get("/:id", disciplineController.findById);

discipline.get("/:id/exams", disciplineController.findExamsByDisciplineId);

export default discipline;
