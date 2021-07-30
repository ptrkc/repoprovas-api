import { getRepository } from "typeorm";

import Discipline from "../../src/entities/Discipline";

export async function createDiscipline() {
    const discipline = await getRepository(Discipline).create({
        name: "Physics",
    });

    await getRepository(Discipline).save(discipline);

    return discipline;
}
