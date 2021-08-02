import Professor from "../entities/Professor";
import { getRepository } from "typeorm";

export async function find() {
    const professors = await getRepository(Professor)
        .createQueryBuilder("professors")
        .leftJoin("professors.exams", "exams")
        .select("professors.id", "id")
        .addSelect("professors.name", "name")
        .addSelect("COUNT(DISTINCT(exams.id)) as exams")
        .groupBy("professors.id")
        .orderBy("professors.name")
        .getRawMany();
    return professors;
}
