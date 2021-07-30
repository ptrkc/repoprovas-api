import { getRepository } from "typeorm";

import Professor from "../../src/entities/Professor";

export async function createProfessor() {
    const professor = await getRepository(Professor).create({
        name: "Albert Einstein",
    });

    await getRepository(Professor).save(professor);

    return professor;
}
