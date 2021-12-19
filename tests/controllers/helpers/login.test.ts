import app from "../../../src/server";
import supertest from "supertest";

export default async function login(): Promise<string> {
  const res = await supertest(app)
    .post("/api/users/login")
    .send({ username: "admin", password: "secret" })
    .expect(200)
    .expect("Content-Type", /json/);

  return res.body.jwt;
}
