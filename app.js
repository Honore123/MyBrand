const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const blogRouter = require("./routes/blogRouter");
const authRouter = require("./routes/authRouter");
const inquiryRouter = require("./routes/inquiryRouter");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyBrand API",
      version: "1.0.0",
      description: "API for Honore's MyBrand project mad with Express",
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://real-jade-katydid-fez.cyclic.app" },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://honore123.github.io"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/blogs", blogRouter);
app.use(authRouter);
app.use("/inquiries", inquiryRouter);

module.exports = app;
