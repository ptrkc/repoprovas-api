import { getConnection } from "typeorm";
import Discipline from "../../src/entities/Discipline";
import Professor from "../../src/entities/Professor";
import ExamType from "../../src/entities/ExamType";
import Exam from "../../src/entities/Exam";
import faker from "faker";

export default async function createExam() {
    const professor1 = new Professor();
    professor1.name = faker.name.findName();

    const professor2 = new Professor();
    professor2.name = faker.name.findName();

    const professors = await getConnection().manager.save([
        professor1,
        professor2,
    ]);

    const discipline1 = new Discipline();
    discipline1.name = faker.company.bs().toUpperCase();
    discipline1.semester = Math.floor(Math.random() * 8 + 1);
    discipline1.professors = [professors[0], professors[1]];

    const discipline2 = new Discipline();
    discipline2.name = faker.company.bs().toUpperCase();
    discipline2.semester = Math.floor(Math.random() * 8 + 1);
    discipline2.professors = [professors[0]];

    const disciplines = await getConnection().manager.save([
        discipline1,
        discipline2,
    ]);

    const typesArray = ["P1", "P2", "2ch", "Outras"];

    const examType1 = new ExamType();
    examType1.name = typesArray[Math.floor(Math.random() * 4)];

    const examType2 = new ExamType();
    examType2.name = typesArray[Math.floor(Math.random() * 4)];

    const types = await getConnection().manager.save([examType1, examType2]);

    const exam1 = new Exam();
    exam1.year = 2018;
    exam1.semester = 2;
    exam1.type = types[0];
    exam1.discipline = disciplines[0];
    exam1.professor = professors[0];
    exam1.url = "https://upload.com/exam123.pdf";

    const exam2 = new Exam();
    exam2.year = 2019;
    exam2.semester = 1;
    exam2.type = types[1];
    exam2.discipline = disciplines[1];
    exam2.professor = professors[0];
    exam2.url = "https://upload.com/exam1234.pdf";

    const exam3 = new Exam();
    exam3.year = 2019;
    exam3.semester = 1;
    exam3.type = types[3];
    exam3.discipline = disciplines[1];
    exam3.professor = professors[1];
    exam3.url = "https://upload.com/exam1234.pdf";

    await getConnection().manager.save([exam1, exam2, exam3]);
}
