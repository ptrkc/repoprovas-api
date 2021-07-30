import { getRepository } from "typeorm";
import Professor from "../../src/entities/Professor";

export async function createProfessor() {
    const repository = getRepository(Professor);
    const professor = repository.create({
        name: "Albert Einstein",
    });
    await repository.save(professor);
    return professor;
}
