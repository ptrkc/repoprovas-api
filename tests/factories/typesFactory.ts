import { getConnection } from "typeorm";
import ExamType from "../../src/entities/ExamType";

export default async function typesFactory() {
    const typesArray = ["P1", "P2", "P3", "2ch", "Outras"];
    const examType1 = new ExamType();
    examType1.name = typesArray[0];
    const examType2 = new ExamType();
    examType2.name = typesArray[1];
    const examType3 = new ExamType();
    examType3.name = typesArray[2];
    const examType4 = new ExamType();
    examType4.name = typesArray[3];
    const examType5 = new ExamType();
    examType5.name = typesArray[4];
    const types = await getConnection().manager.save([
        examType1,
        examType2,
        examType3,
        examType4,
        examType5,
    ]);
    return types;
}
