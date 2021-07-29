import supertest from "supertest";
import app, { init } from "../../src/app";
import { getConnection } from "typeorm";
import "../../src/setup";

beforeAll(init);

afterAll(async () => {
    await getConnection().close();
});

describe("GET /test", () => {
    it('should answer with text "OK!" and status 200', async () => {
        const response = await supertest(app).get("/test");
        expect(response.text).toBe("OK!");
        expect(response.status).toBe(200);
    });
});
