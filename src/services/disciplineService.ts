import Discipline from "../entities/Discipline";
import { getRepository } from "typeorm";
import Exam from "../entities/Exam";

export async function find() {
    const repository = getRepository(Discipline);
    const discipline = await repository.find({ relations: ["professors"] });
    return discipline;
}

export async function findById(id: number) {
    const repository = getRepository(Discipline);
    const discipline = await repository.find({ id });
    if (!discipline.length) return 404;
    return discipline;
}

export async function findExamsByDisciplineId(id: number) {
    const discipline = await findById(id);
    if (discipline === 404) return 404;
    const repository = getRepository(Exam);
    const exams = await repository.find({
        relations: ["type", "professor"],
        where: {
            discipline: {
                id: id,
            },
        },
    });
    return { discipline: discipline[0].name, exams };
}
