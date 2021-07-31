import express from "express";
import * as professorController from "../controllers/professorController";
const professors = express.Router();

professors.get("/", professorController.find);

professors.get("/:id", professorController.findById);

professors.get("/:id/exams", professorController.findExamsByProfessorId);

export default professors;
