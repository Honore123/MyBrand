const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://h01:zupwEr-nyxji4-pyzhoc@mybrand.drvbekc.mongodb.net/my-brand?retryWrites=true&w=majority";
const blogId = "6408346dd82cffa860074200";
const blogData = {
  title: "Second blog",
  content: "asdsadasdsadsa",
  likes: 0,
  thumbnail: "public/images/honore.png",
};

describe("Blog", () => {
  beforeAll(async () => {
    await mongoose.connect(dbURI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Fetching blog", () => {
    it("Get all blogs", async () => {
      await supertest(app).get("/blogs").expect(200);
    });
    it("Get a single blog", async () => {
      await supertest(app).get(`/blogs/${blogId}`).expect(200);
    });
  });

  describe("Create new blog", () => {
    describe("Admin not logged in", () => {
      it("should return 400", async () => {
        await supertest(app).post("/blogs").send(blogData).expect(400);
      });
    });
  });
  describe("Delete a blog", () => {
    describe("Admin not logged in", () => {
      it("should return 400", async () => {
        await supertest(app).delete(`/blogs/${blogId}`).expect(400);
      });
    });
  });
});
