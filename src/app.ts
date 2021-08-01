import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import disciplines from "./routers/disciplineRouter";
import professors from "./routers/professorRouter";
import exams from "./routers/examRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/disciplines", disciplines);

app.use("/professors", professors);

app.use("/exams", exams);

export async function init() {
    await connectDatabase();
}

export default app;
