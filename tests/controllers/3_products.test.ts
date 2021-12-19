import app from "../../src/server";
import supertest from "supertest";
import login from "./helpers/login.test";

describe("Test products routes", (): void => {
  it("GET /api/products = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/products")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.data).toBeDefined();
  });

  it("POST /api/products = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const token = await login();
    const res = await supertest(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test 123", price: 10, category: 1 })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });

  it("GET /api/products/1 = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/products/1")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });

  it("GET /api/products/top/5 = HAS TO RETURN A EMPTY JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/products/top/5")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });

  it("GET /api/products/category/1 = HAS TO RETURN A JSON WITH ONE ROW SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/products/category/1")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.length).toEqual(1);
  });
});
