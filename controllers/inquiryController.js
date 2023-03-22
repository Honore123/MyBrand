const Inquiry = require("../models/Inquiry");

module.exports.index = (req, res) => {
  Inquiry.find()
    .then((inquiries) => {
      res.status(200).json({
        data: inquiries.reverse(),
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
  const { id } = req.params;
  Inquiry.findById(id)
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
  const { body } = req;
  const inquiry = new Inquiry(body);

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
module.exports.destroy = (req, res) => {
  const { id } = req.params;
  Inquiry.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        data: [result],
        status: 200,
        message: "Query deleted successfully",
      });
    })
    .catch((err) => {
      res
        .status(err.status)
        .json({ data: [], status: err.status, message: err.message });
    });
};
