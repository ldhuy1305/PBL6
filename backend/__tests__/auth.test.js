const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

let token;

beforeAll((done) => {
  request(app)
    .post("/api/auth/login")
    .send({
      email: "user321@gmail.com",
      password: "leduchuy123",
    })
    .end((err, response) => {
      token = response.body.token; // lưu token để sử dụng sau này
      done();
    });
}, 10000);

describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app)
      .get("/api/shipper")
      .set("Authorization", `Bearer ${token}`); // sử dụng token
    expect(res.statusCode).toBe(200);
  });
});
