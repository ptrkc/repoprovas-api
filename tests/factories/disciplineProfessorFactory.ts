import { getConnection } from "typeorm";
import Discipline from "../../src/entities/Discipline";
import Professor from "../../src/entities/Professor";

export default async function createDisciplineProfessor() {
    const professor1 = new Professor();
    professor1.name = "Gisélia Maria";
    await getConnection().manager.save(professor1);

    const professor2 = new Professor();
    professor2.name = "Glaci Gonçalves";
    await getConnection().manager.save(professor2);

    const discipline1 = new Discipline();
    discipline1.name = "Cálculo I";
    discipline1.semester = 1;
    discipline1.professors = [professor1, professor2];
    await getConnection().manager.save(discipline1);

    const discipline2 = new Discipline();
    discipline2.name = "Estatística I";
    discipline2.semester = 2;
    discipline2.professors = [professor1];
    await getConnection().manager.save(discipline2);
}
