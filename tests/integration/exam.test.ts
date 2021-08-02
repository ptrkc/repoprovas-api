import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../utils/database";
import typesFactory from "../factories/typesFactory";
import Exam from "../../src/entities/Exam";
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

describe("POST /exams", () => {
    it("should save an exam and answer with id and status 201", async () => {
        await typesFactory();
        await createDisciplineProfessor();
        const body = {
            disciplineId: 1,
            professorId: 1,
            year: 2020,
            semester: 2,
            typeId: 1,
            examURL: "https://test.com/doc.pdf",
        };
        const response = await supertest(app).post(`/exams`).send(body);
        const newExam = await getRepository(Exam).find();
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                }),
            ])
        );
        expect(response.status).toBe(201);
        expect(newExam.length).toBe(1);
    });
    it("should answer with 400 if no body was provided", async () => {
        const response = await supertest(app).post(`/exams`);
        expect(response.status).toBe(400);
    });
});
