import { getRepository } from "typeorm";
import Discipline from "../../src/entities/Discipline";

export async function createDiscipline(newDiscipline: {
    name: string;
    semester: number;
}) {
    const repository = getRepository(Discipline);
    const discipline = repository.create(newDiscipline);
    await repository.save(discipline);
    return discipline;
}
