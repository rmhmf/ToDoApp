import request from "supertest";
import app from "../app";

describe("Test Get /footer", () => {
  it("Should return a string", async () => {
    const res = await request(app).get("/api/footer");
    expect(res.body.text).toBe("Designed by Reza");
    expect(res.status).toBe(200);
  });
});
