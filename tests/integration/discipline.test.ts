import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import createDisciplineProfessor from "../factories/disciplineProfessorFactory";

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

describe("GET /disciplines/:id", () => {
    it("should answer with discipline object and status 200", async () => {
        await createDisciplineProfessor();
        const id = 1;
        const response = await supertest(app).get(`/disciplines/${id}`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    semester: expect.any(Number),
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
    it("should answer with 404 if id does not exists", async () => {
        const id = 1;
        const response = await supertest(app).get(`/disciplines/${id}`);
        expect(response.status).toBe(404);
    });
    it("should answer with 400 if id is NaN", async () => {
        const id = "nope";
        const response = await supertest(app).get(`/disciplines/${id}`);
        expect(response.status).toBe(400);
    });
});
