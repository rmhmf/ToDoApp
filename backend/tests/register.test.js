import request from "supertest";
import app from "../app";
import db from "../services/db";

describe("Test Post /register", () => {
  it("Should register a new, legitimate user to the database", async () => {
    const res = await request(app).post("/api/register").send({
      email: "test@test.com",
      password: "abcdefg",
      birthDate: null,
    });
    console.log("here", res.body);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(3);
    expect(res.body.email).toBe("test@test.com");
  });
});
