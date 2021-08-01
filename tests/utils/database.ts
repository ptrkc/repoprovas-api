import { getConnection } from "typeorm";

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
