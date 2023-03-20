const express = require("express");
const inquiryController = require("../controllers/inquiryController");
const { authMiddleware } = require("../middleware/authMiddleware");
const inquiryRouter = express.Router();

inquiryRouter
  .route("/")
  /**
   * @swagger
   * tags:
   *  name: Inquiries
   *  description: Queries managing APIs
   * /inquiries:
   *  get:
   *   summary: Fetch all queries
   *   tags: [Inquiries]
   *   responses:
   *    200:
   *      description: List all queries
   *      content:
   *        application/json:
   *          schema:
   *            type: array
   *            properties:
   *                data:
   *                  type: array
   *                status:
   *                  type: integer
   *                message:
   *                  type: string
   *            example:
   *                data: [
   *                    {
   *                       "_id": "6408346dd82cffa860074200",
   *                       "visitor_name": "John Doe",
   *                       "visitor_email": "john@gmail.com",
   *                       "visitor_message": "Hello there",
   *                       "createdAt": "2023-03-08T07:08:29.851Z",
   *                       "updatedAt": "2023-03-08T07:08:29.851Z",
   *                       "__v": 0
   *                   }
   *                  ]
   *                status: 200
   *                message: "queries fetched successfully"
   */
  .get(authMiddleware, inquiryController.index)
  /**
   * @swagger
   * tags:
   *  name: Inquiries
   *  description: Queries managing APIs
   * /inquiries:
   *  post:
   *   security:
   *      - bearerAuth: []
   *   summary: Creating new query
   *   tags: [Inquiries]
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *              type: object
   *              properties:
   *                visitor_names:
   *                  type: string
   *                visitor_email:
   *                  type: string
   *                visitor_message:
   *                  type: string
   *              example:
   *                visitor_names: "John Doe"
   *                visitor_email:  "john@gmail.com"
   *                visitor_message: "Hello! Can we work together"
   *   responses:
   *    200:
   *      description: List a query
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *                data:
   *                  type: object
   *                status:
   *                  type: integer
   *                message:
   *                  type: string
   *            example:
   *                data:
   *                    {
   *                       "_id": "6408346dd82cffa860074200",
   *                       "visitor_names": "John Doe",
   *                       "visitor_email": "john@gmail.com",
   *                       "visitor_message": "Hello there",
   *                       "createdAt": "2023-03-08T07:08:29.851Z",
   *                       "updatedAt": "2023-03-08T07:08:29.851Z",
   *                       "__v": 0
   *                   }
   *
   *                status: 200
   *                message: "query sent successfully"
   */
  .post(inquiryController.store);

inquiryRouter
  .route("/:id")
  /**
   * @swagger
   * tags:
   *  name: Inquiries
   *  description: Queries managing APIs
   * /inquiries/{id}:
   *  get:
   *   summary: Fetch a query by ID
   *   tags: [Inquiries]
   *   parameters:
   *     - name: id
   *       in: path
   *       required: true
   *       description: The ID of the query to return.
   *       schema:
   *         type: string
   *   responses:
   *    200:
   *      description: List a query
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *                data:
   *                  type: object
   *                status:
   *                  type: integer
   *                message:
   *                  type: string
   *            example:
   *                data:
   *                    {
   *                       "_id": "6408346dd82cffa860074200",
   *                       "visitor_name": "John Doe",
   *                       "visitor_email": "john@gmail.com",
   *                       "visitor_message": "Hello there",
   *                       "createdAt": "2023-03-08T07:08:29.851Z",
   *                       "updatedAt": "2023-03-08T07:08:29.851Z",
   *                       "__v": 0
   *                   }
   *
   *                status: 200
   *                message: "Query fetched successfully"
   */
  .get(authMiddleware, inquiryController.show);
module.exports = inquiryRouter;
