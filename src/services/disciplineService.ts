import Discipline from "../entities/Discipline";
import { getRepository } from "typeorm";

export async function find() {
    const repository = getRepository(Discipline);
    const discipline = repository.find();
    return discipline;
}

export async function findById(id: number) {
    return;
}
