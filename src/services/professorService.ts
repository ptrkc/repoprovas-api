import Professor from "../entities/Professor";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Professor);
    const professors = repository.find();
    return professors;
}

export async function findById(id: number) {
    return;
}
