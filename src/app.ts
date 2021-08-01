import "reflect-metadata";
import connectDatabase from "./database";
import express from "express";
import cors from "cors";
import disciplines from "./routers/disciplineRouter";
import professors from "./routers/professorRouter";
import exams from "./routers/examRouter";
import createExam from "../tests/factories/examFactory";
import { clearDatabase } from "../tests/utils/database";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/disciplines", disciplines);

app.use("/professors", professors);

app.use("/exams", exams);

app.get("/test-add", async (req, res) => {
    await createExam();
    res.send("OK");
});

app.get("/test-remove", async (req, res) => {
    await clearDatabase();
    res.send("OK");
});

export default app;

export async function init() {
    await connectDatabase();
}
