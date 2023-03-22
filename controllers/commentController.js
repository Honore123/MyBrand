const Blog = require("../models/Blog");

module.exports.index = (req, res, next) => {
  const { blogId } = req.params;
  Blog.findById(blogId)
    .then((blog) => {
      if (blog != null) {
        res.status(200).json({
          data: blog.comment.reverse(),
          status: 200,
          message: "Comment fetched successfully",
        });
      } else {
        res.status(404).json({ status: 404, message: "Blog not found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ status: 400, message: "Undefined blog Id" });
    });
};
module.exports.store = (req, res) => {
  const { blogId } = req.params;
  Blog.findById(blogId)
    .then((blog) => {
      if (blog != null) {
        blog.comment.push(req.body);
        blog.save().then((blog) => {
          res.status(200).json({
            status: 200,
            data: blog.comment,
            message: "Comment added successfully",
          });
        });
      } else {
        res.status(404).json({ status: 400, message: "Blog not found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ status: 400, message: "Undefined blog Id" });
    });
};
