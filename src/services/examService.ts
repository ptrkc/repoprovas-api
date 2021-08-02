import { getRepository } from "typeorm";
import Discipline from "../entities/Discipline";
import Exam from "../entities/Exam";
import Professor from "../entities/Professor";
import { validateNewExam } from "../middlewares/validateNewExam";
export interface NewExam {
    disciplineId: number;
    professorId: number;
    year: number;
    semester: 1 | 2;
    typeId: 1 | 2 | 3 | 4 | 5;
    examURL: string;
}

export async function post(newExam: NewExam) {
    try {
        if (!validateNewExam(newExam)) return 400;
        const { disciplineId, professorId, year, semester, typeId, examURL } =
            newExam;
        const discipline = await getRepository(Discipline).find({
            relations: ["professors"],
            where: {
                id: disciplineId,
            },
        });
        if (!discipline.length) return 400;
        const validProfessor = discipline[0].professors.find(
            (p) => p.id === professorId
        );
        if (!validProfessor) return 400;
        const exam = await getRepository(Exam)
            .createQueryBuilder()
            .insert()
            .into(Exam)
            .values([
                {
                    year,
                    semester,
                    type: { id: typeId },
                    professor: { id: professorId },
                    discipline: { id: disciplineId },
                    url: examURL.trim(),
                },
            ])
            .execute();
        return exam.identifiers;
    } catch (e) {
        console.log(e);
        return 500;
    }
}

export async function findById(id: number) {
    const exam = await getRepository(Exam).find({
        relations: ["type", "professor", "discipline"],
        where: {
            id: id,
        },
    });
    if (!exam.length) return 404;
    return exam;
}

export async function findByDisciplineId(id: number) {
    const discipline = await getRepository(Discipline).find({ id });
    if (!discipline.length) return 404;
    const exams = await getRepository(Exam).find({
        relations: ["type", "professor"],
        where: {
            discipline: {
                id: id,
            },
        },
    });
    return { discipline: discipline[0].name, exams };
}

export async function findByProfessorId(id: number) {
    const professor = await getRepository(Professor).find({ id });
    if (!professor.length) return 404;
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
