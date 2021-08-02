import express from "express";
import * as disciplineController from "../controllers/disciplineController";
const discipline = express.Router();

discipline.get("/", disciplineController.find);

discipline.get("/professors", disciplineController.findWithProfessors);

discipline.get("/:id", disciplineController.findById);

export default discipline;
