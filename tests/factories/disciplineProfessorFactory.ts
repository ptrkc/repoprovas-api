import { getConnection } from "typeorm";
import Discipline from "../../src/entities/Discipline";
import Professor from "../../src/entities/Professor";
import faker from "faker";

export default async function createDisciplineProfessor() {
    const professor1 = new Professor();
    professor1.name = faker.name.findName();

    const professor2 = new Professor();
    professor2.name = faker.name.findName();

    const professors = await getConnection().manager.save([
        professor1,
        professor2,
    ]);

    const discipline1 = new Discipline();
    discipline1.name = faker.company.bs();
    discipline1.semester = 1;
    discipline1.professors = [professors[0], professors[1]];
    await getConnection().manager.save(discipline1);

    const discipline2 = new Discipline();
    discipline2.name = faker.company.bs();
    discipline2.semester = 2;
    discipline2.professors = [professors[0]];
    await getConnection().manager.save([discipline1, discipline2]);
}
