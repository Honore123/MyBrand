const Inquiry = require("../models/Inquiry");

module.exports.index = (req, res) => {
  Inquiry.find()
    .then((inquiries) => {
      res.status(200).json({
        data: inquiries,
        status: 200,
        message: "Queries fetched successfully",
      });
    })
    .catch((err) =>
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message })
    );
};

module.exports.show = (req, res) => {
  Inquiry.findById(req.params.id)
    .then((inquiry) => {
      res.status(200).json({
        data: [inquiry],
        status: 200,
        message: "Query fetched successfully",
      });
    })
    .catch((err) =>
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message })
    );
};

module.exports.store = (req, res) => {
  const inquiry = new Inquiry(req.body);

  inquiry
    .save()
    .then((result) => {
      res.status(200).json({
        data: [result],
        status: 200,
        message: "Query sent successfully",
      });
    })
    .catch((err) =>
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message })
    );
};
