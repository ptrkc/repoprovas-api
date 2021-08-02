import Discipline from "../entities/Discipline";
import { getRepository } from "typeorm";

export async function find() {
    const disciplines = await getRepository(Discipline)
        .createQueryBuilder("disciplines")
        .leftJoin("disciplines.exams", "exams")
        .select("disciplines.id", "id")
        .addSelect("disciplines.name", "name")
        .addSelect("disciplines.semester", "semester")
        .addSelect("COUNT(DISTINCT(exams.id)) as exams")
        .groupBy("disciplines.id")
        .orderBy("disciplines.name")
        .getRawMany();
    return disciplines;
}

export async function findWithProfessors() {
    const disciplines = await getRepository(Discipline).find({
        relations: ["professors"],
        order: {
            name: "ASC",
        },
    });
    return disciplines;
}

export async function findById(id: number) {
    const discipline = await getRepository(Discipline).find({ id });
    if (!discipline.length) return 404;
    return discipline;
}
