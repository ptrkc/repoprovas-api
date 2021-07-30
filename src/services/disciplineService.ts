import Discipline from "../entities/Discipline";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Discipline);
    const discipline = await repository.find();
    return discipline;
}

export async function findById(id: number) {
    const repository = getRepository(Discipline);
    const discipline = await repository.find({ id });
    if (!discipline.length) return 404;
    return discipline;
}
