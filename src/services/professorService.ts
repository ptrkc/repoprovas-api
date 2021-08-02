import Professor from "../entities/Professor";
import Exam from "../entities/Exam";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Professor);
    const professors = await repository
        .createQueryBuilder("professors")
        .leftJoin("professors.exams", "exams")
        .select("professors.id", "id")
        .addSelect("professors.name", "name")
        .addSelect("COUNT(DISTINCT(exams.id)) as exams")
        .groupBy("professors.id")
        .orderBy("professors.name")
        .getRawMany();
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
    const exams = await getRepository(Exam).find({
        relations: ["type", "discipline"],
        where: {
            professor: {
                id: id,
            },
        },
    });
    return { professor: professor[0].name, exams };
}
