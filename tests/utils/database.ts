import { getConnection } from "typeorm";

export async function clearDatabase() {
    const tables = [
        "exams",
        "examType",
        "professors",
        "disciplines",
        "disciplines_professors_professors",
    ];
    let query = "";
    for (const table of tables) {
        query += `TRUNCATE "${table}" RESTART IDENTITY CASCADE;`;
    }
    await getConnection().query(query);
}
