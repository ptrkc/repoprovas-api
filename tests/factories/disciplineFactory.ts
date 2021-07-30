import { getRepository } from "typeorm";
import Discipline from "../../src/entities/Discipline";

export async function createDiscipline() {
    const repository = getRepository(Discipline);
    const discipline = repository.create({
        name: "Physics",
    });
    await repository.save(discipline);
    return discipline;
}
