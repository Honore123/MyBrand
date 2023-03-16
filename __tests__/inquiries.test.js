const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://h01:zupwEr-nyxji4-pyzhoc@mybrand.drvbekc.mongodb.net/my-brand?retryWrites=true&w=majority";
const queryData = {
  visitor_names: "IMANISHIMWE Honore",
  visitor_email: "imanishimwehono@gmail.com",
  visitor_message: "Hello I am Honore I would like to work with you",
};
const queryId = "";
describe("Inquiries", () => {
  beforeAll(async () => {
    await mongoose.connect(dbURI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Fetching queries", () => {
    describe("Admin not logged in", () => {
      it("should return 400", async () => {
        await supertest(app).get("/inquiries").expect(400);
      });
      it("should return 400", async () => {
        await supertest(app).get(`/inquiries/${queryId}`).expect(400);
      });
    });
  });

  describe("Create a query", () => {
    describe("All data given", () => {
      it("should return 200", async () => {
        await supertest(app).post("/inquiries").send(queryData).expect(200);
      });
    });
  });
});
