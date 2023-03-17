const Blog = require("../models/Blog");
module.exports.index = (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.status(200).json({
        data: blogs,
        status: 200,
        message: "blogs fetched successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.show = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.json({
        data: [blog],
        status: 200,
        message: "blog fetched successfully",
      });
    })
    .catch((err) => console.log(err));
};
module.exports.store = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) =>
      res.send({
        data: [result],
        status: 200,
        message: "blog created successfully",
      })
    )
    .catch((err) => console.log(err));
};

module.exports.destroy = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) =>
      res.json({
        data: result,
        status: 200,
        message: "blog deleted successfully",
      })
    )
    .catch((err) => console.log(err));
};

module.exports.like = (req, res) => {
  Blog.findById(req.params.blogId)
    .then((blog) => {
      if (blog != null) {
        blog.likes++;
        blog.save().then((blog) => {
          res
            .status(200)
            .json({ data: blog, status: 200, message: "You liked the blog" });
        });
      } else {
        res.status(404).json({ status: 400, message: "Blog not found" });
      }
    })
    .catch((err) => {
      res.status(401).json({ data: {}, status: 400, message: err.message });
    });
};
