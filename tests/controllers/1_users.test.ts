import app from "../../src/server";
import supertest from "supertest";

describe("Test users routes", (): void => {
  let authorization: string;
  it("POST /api/users = HAS TO RETURN A JSON SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .post("/api/users")
      .send({
        username: "admin",
        password: "secret",
        firstName: "Admin",
        lastName: "User",
      })
      .expect((res): void => {
        if (res.status != 200) {
          console.log(JSON.stringify(res.body, null, 2));
        }
      })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toBeDefined();
  });

  it("POST /api/users/login = HAS TO LOGIN SUCCESSFULLY", async (): Promise<void> => {
    const res = await supertest(app)
      .post("/api/users/login")
      .send({
        username: "admin",
        password: "secret",
      })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body.jwt).toBeDefined();
    authorization = res.body.jwt;
  });

  it("GET /api/users = HAS TO RETURN ALL USERS", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authorization}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.data.length).toBe(1);
  });

  it("GET /api/users/1 = HAS TO RETURN THE USER DATA", async (): Promise<void> => {
    const res = await supertest(app)
      .get("/api/users/1")
      .set("Authorization", `Bearer ${authorization}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.id).toBe(1);
  });
});
