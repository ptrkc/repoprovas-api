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

describe("GET /disciplines", () => {
    it("should answer with disciplines array and status 200", async () => {
        await createDisciplineProfessor();
        const response = await supertest(app).get("/disciplines");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    semester: expect.any(Number),
                    exams: expect.any(String),
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
});

describe("GET /disciplines/professors", () => {
    it("should answer with disciplines array and status 200", async () => {
        await createDisciplineProfessor();
        const response = await supertest(app).get("/disciplines/professors");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    semester: expect.any(Number),
                    professors: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                        }),
                    ]),
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
});
