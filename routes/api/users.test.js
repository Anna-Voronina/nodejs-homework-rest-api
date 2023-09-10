const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { DB_HOST_TEST } = process.env;

const loginData = {
  email: "anna@gmail.com",
  password: "1234567",
};

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test response status", async () => {
    const { statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
  });

  test("test response token", async () => {
    const { body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(body).toHaveProperty("token");
  });

  test("test response user data and its types", async () => {
    const { body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
