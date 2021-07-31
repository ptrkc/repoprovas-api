import { getRepository, getConnection } from "typeorm";

import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";
import Exam from "../../src/entities/Exam";
import ExamType from "../../src/entities/ExamType";

export async function clearDatabase() {
    const tables = [
        "exams",
        "examType",
        "professors",
        "disciplines",
        "disciplines_professors_professors",
    ];
    for (const table of tables) {
        await getConnection().query(
            `TRUNCATE "${table}" RESTART IDENTITY CASCADE`
        );
    }
}
