const Blog = require("../models/Blog");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

module.exports.upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

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
module.exports.fetchImage = (req, res) => {
  res.sendFile(`./public/images/${req.params.image}`, { root: "." });
};
module.exports.fetchLimit = (req, res) => {
  Blog.find()
    .sort({ createAt: -1 })
    .limit(req.params.number)
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
  const blog = new Blog(JSON.parse(req.body.blog));
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

module.exports.update = (req, res) => {
  Blog.updateOne({ _id: req.params.id }, { $set: req.body })
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
