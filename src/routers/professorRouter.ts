import express from "express";
import * as professorController from "../controllers/professorController";
const professors = express.Router();

professors.get("/", professorController.find);

professors.get("/:id", professorController.findById);

export default professors;
