import "reflect-metadata";
import connectDatabase from "./database";
import express from "express";
import cors from "cors";
import disciplines from "./routers/disciplineRouter";
import professors from "./routers/professorRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/disciplines", disciplines);

app.use("/professors", professors);

app.get("/test", (req, res) => {
    res.send("OK!");
});

export default app;

export async function init() {
    await connectDatabase();
}
