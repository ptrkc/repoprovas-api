import { getRepository } from "typeorm";

import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";

export async function clearDatabase() {
    await getRepository(Professor).delete({});
    await getRepository(Discipline).delete({});
}
