import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import "../../src/setup";

beforeAll(init);

afterAll(async () => {
    await getConnection().close();
});

describe("GET /professors", () => {
    it("should answer with professors array status 200", async () => {
        const response = await supertest(app).get("/professors");
        expect(response.body.length).toBe(3);
        expect(response.status).toBe(200);
    });
});
