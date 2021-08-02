import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import createDisciplineProfessor from "../factories/disciplineProfessorFactory";
import createExam from "../factories/examFactory";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe("GET /professors", () => {
    it("should answer with professors array and status 200", async () => {
        await createDisciplineProfessor();
        const response = await supertest(app).get("/professors");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
});
