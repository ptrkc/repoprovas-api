import { getRepository } from "typeorm";
import Discipline from "../entities/Discipline";
import Exam from "../entities/Exam";
import Professor from "../entities/Professor";

interface NewExam {
    disciplineId: number;
    professorId: number;
    year: number;
    semester: 1 | 2;
    typeId: 1 | 2 | 3 | 4;
    examURL: string;
}
export async function post(newExam: NewExam) {
    try {
        //verificar o objeto
        const { disciplineId, professorId, year, semester, typeId, examURL } =
            newExam;
        //verificar na materia se o prof é valido
        await getRepository(Exam)
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
                    url: examURL,
                },
            ])
            .execute();
        return;
    } catch (e) {
        console.log(e);
        return 400;
    }
}

export async function findById(id: number) {
    const exam = await getRepository(Exam).find({
        relations: ["type", "professor", "discipline"],
        where: {
            exam: {
                id: id,
            },
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
