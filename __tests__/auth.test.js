const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://h01:zupwEr-nyxji4-pyzhoc@mybrand.drvbekc.mongodb.net/my-brand?retryWrites=true&w=majority";
const blogId = "6408346dd82cffa860074200";
const authData = {
  email: "admin@honore.com",
  password: "password",
};

describe("Admin authentication", () => {
  beforeAll(async () => {
    await mongoose.connect(dbURI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Login admin", () => {
    describe("valid credentials", () => {
      it("should return 200", async () => {
        await supertest(app).post("/login").send(authData).expect(200);
      });
    });
    describe("Invalid credentials", () => {
      it("should return 400", async () => {
        await supertest(app).post("/login").send({}).expect(400);
      });
    });
  });

  describe("Logout Admin", () => {
    it("should return 200", async () => {
      await supertest(app).post("/logout").expect(200);
    });
  });
});
