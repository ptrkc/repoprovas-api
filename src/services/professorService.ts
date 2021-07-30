import Professor from "../entities/Professor";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Professor);
    const professors = await repository.find();
    return professors;
}

export async function findById(id: number) {
    const repository = getRepository(Professor);
    const professor = await repository.find({ id });
    if (!professor.length) return 404;
    return professor;
}
