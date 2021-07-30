import { getRepository } from "typeorm";

import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";

export async function clearDatabase() {
    await getRepository(Professor).query(
        "TRUNCATE professors RESTART IDENTITY CASCADE;"
    );
    await getRepository(Discipline).query(
        "TRUNCATE disciplines RESTART IDENTITY CASCADE;"
    );
}
