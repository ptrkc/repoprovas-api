import Professor from "../entities/Professor";
import Exam from "../entities/Exam";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Professor);
    const professors = await repository.find();
    return professors;
}

export async function findById(id: number) {
    const repository = getRepository(Professor);
    const professor = await repository.find({ id });
    if (!professor.length) return 404;
    return professor;
}

export async function findExamsByProfessorId(id: number) {
    const professor = await findById(id);
    if (professor === 404) return 404;
    const repository = getRepository(Exam);
    const exams = await repository.find({
        relations: ["type", "discipline"],
        where: {
            professor: {
                id: id,
            },
        },
    });
    return { professor: professor[0].name, exams };
}
