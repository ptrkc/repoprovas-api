import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import { createDiscipline } from "../factories/disciplineFactory";
import { clearDatabase } from "../utils/database";

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
        const discipline = await createDiscipline();
        const response = await supertest(app).get("/disciplines");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: discipline.name,
                }),
            ])
        );
        expect(response.status).toBe(200);
    });
});

describe("GET /disciplines/:id", () => {
    it("should answer with discipline object and status 200", async () => {
        const discipline = await createDiscipline();
        const id = 1;
        const response = await supertest(app).get(`/disciplines/${id}`);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: discipline.name,
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
