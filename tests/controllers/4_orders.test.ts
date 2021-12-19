import app from "../../src/server";
import supertest from "supertest";
import login from "./helpers/login.test";

describe("Test order routes", (): void => {
  it("GET /api/orders/completed = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const token = await login();
    const res = await supertest(app)
      .get("/api/orders/completed")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.data.length).toEqual(0);
  });

  it("POST /api/orders = HAS TO RETURN A JSON SUCCESSFULLY AFTER INSERTING AN ORDER", async (): Promise<void> => {
    const token = await login();
    const res = await supertest(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        products: [{ product: 1, quantity: 15 }],
        userid: 1,
        complete: false,
      })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.id).toBeDefined();
  });

  it("GET /api/orders/current = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const token = await login();
    const res = await supertest(app)
      .get("/api/orders/current")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.data.length).toEqual(1);
  });
});
