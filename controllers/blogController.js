const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");

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
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => {
      res.json({
        data: [blog],
        status: 200,
        message: "blog fetched successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.fetchLimit = (req, res) => {
  const { number } = req.params;
  Blog.find()
    .sort({ createAt: -1 })
    .limit(number)
    .then((blogs) => {
      res.status(200).json({
        data: blogs,
        status: 200,
        message: "blogs fetched successfully",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports.store = (req, res) => {
  const file = req.file.buffer.toString("base64");
  const uploadStr = "data:" + req.file.mimetype + ";base64," + file;
  cloudinary.uploader
    .upload(uploadStr, {
      folder: "blog_images",
    })
    .then((result) => {
      const { title, likes, content } = JSON.parse(req.body.blog);
      const blog = new Blog({
        title,
        likes,
        content,
        thumbnail: result.secure_url,
      });
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
    })
    .catch((err) => {
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message });
    });
};

module.exports.update = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Blog.updateOne({ _id: id }, { $set: body })
    .then((result) => {
      res.send({
        data: [result],
        status: 200,
        message: "blog updated successfully",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports.updateWithImage = (req, res) => {
  const { id } = req.params;
  const file = req.file.buffer.toString("base64");
  const uploadStr = "data:" + req.file.mimetype + ";base64," + file;
  cloudinary.uploader
    .upload(uploadStr, {
      folder: "blog_images",
    })
    .then((result) => {
      const { title, likes, content } = JSON.parse(req.body.blog);
      Blog.updateOne(
        { _id: id },
        { $set: { title, content, thumbnail: result.secure_url } }
      )
        .then((data) => {
          res.send({
            data: [data],
            status: 200,
            message: "blog updated successfully",
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err) => {
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message });
    });
};

module.exports.destroy = (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
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
  const { blogId } = req.params;
  Blog.findById(blogId)
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
