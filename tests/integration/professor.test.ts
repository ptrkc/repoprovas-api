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

describe("GET /professors/:id", () => {
    it("should answer with professor object and status 200", async () => {
        await createDisciplineProfessor();
        const id = 1;
        const response = await supertest(app).get(`/professors/${id}`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
    it("should answer with 404 if id does not exists", async () => {
        const id = "1";
        const response = await supertest(app).get(`/professors/${id}`);
        expect(response.status).toBe(404);
    });
    it("should answer with 400 if id is NaN", async () => {
        const id = "nope";
        const response = await supertest(app).get(`/professors/${id}`);
        expect(response.status).toBe(400);
    });
});
