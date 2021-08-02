import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../utils/database";
import typesFactory from "../factories/typesFactory";
import Exam from "../../src/entities/Exam";
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

describe("GET /exams/discipline/:id", () => {
    it("should answer with exams array and status 200", async () => {
        await createExam();
        const id = 1;
        const response = await supertest(app).get(`/exams/discipline/${id}`);
        expect(response.body).toEqual(
            expect.objectContaining({
                exams: expect.any(Array),
                discipline: expect.any(String),
            })
        );
        expect(response.status).toBe(200);
    });
    it("should answer with 404 if id does not exists", async () => {
        const id = 1;
        const response = await supertest(app).get(`/exams/discipline/${id}`);
        expect(response.status).toBe(404);
    });
    it("should answer with 400 if id is NaN", async () => {
        const id = "nope";
        const response = await supertest(app).get(`/exams/discipline/${id}`);
        expect(response.status).toBe(400);
    });
});

describe("GET /exams/professors/:id", () => {
    it("should answer with exams array and status 200", async () => {
        await createExam();
        const id = 1;
        const response = await supertest(app).get(`/exams/professor/${id}`);
        expect(response.body).toEqual(
            expect.objectContaining({
                exams: expect.any(Array),
                professor: expect.any(String),
            })
        );
        expect(response.status).toBe(200);
    });
    it("should answer with 404 if id does not exists", async () => {
        const id = 1;
        const response = await supertest(app).get(`/exams/professor/${id}`);
        expect(response.status).toBe(404);
    });
    it("should answer with 400 if id is NaN", async () => {
        const id = "nope";
        const response = await supertest(app).get(`/exams/professor/${id}`);
        expect(response.status).toBe(400);
    });
});
