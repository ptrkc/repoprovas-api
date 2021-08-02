import Discipline from "../entities/Discipline";
import { getRepository } from "typeorm";
import Exam from "../entities/Exam";

export async function find() {
    const repository = getRepository(Discipline);
    const disciplines = await repository
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
    const repository = getRepository(Discipline);
    const disciplines = await repository.find({
        relations: ["professors"],
        order: {
            name: "ASC",
        },
    });
    return disciplines;
}

export async function findById(id: number) {
    const repository = getRepository(Discipline);
    const discipline = await repository.find({ id });
    if (!discipline.length) return 404;
    return discipline;
}
