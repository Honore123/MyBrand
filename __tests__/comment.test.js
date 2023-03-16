const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://h01:zupwEr-nyxji4-pyzhoc@mybrand.drvbekc.mongodb.net/my-brand?retryWrites=true&w=majority";
const blogId = "6408346dd82cffa860074200";
const commentData = {
  names: "Honore",
  comment: "First comment",
};

describe("Comment on a blog", () => {
  beforeAll(async () => {
    await mongoose.connect(dbURI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Get all comments a blog", () => {
    it("should return 200", async () => {
      await supertest(app).get(`/blogs/${blogId}/comments`).expect(200);
    });
  });
  describe("Add commment on a blg", () => {
    describe("Comment message valid", () => {
      it("should return 200", async () => {
        await supertest(app)
          .post(`/blogs/${blogId}/comments`)
          .send(commentData)
          .expect(200);
      });
    });
  });
});
