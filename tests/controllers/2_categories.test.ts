import app from "../../src/server";
import supertest from "supertest";
import login from "./helpers/login.test";

describe("Test categories routes", (): void => {
  it("GET /api/categories = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/categories")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.data).toBeDefined();
  });

  it("POST /api/categories = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const token = await login();
    const res = await supertest(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test 123" })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });

  it("GET /api/categories/1 = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/categories/1")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });
});
