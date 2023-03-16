const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const inquirySchema = new Schema(
  {
    visitor_names: {
      type: String,
      required: true,
    },
    visitor_email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [isEmail, "Invalid email"],
    },
    visitor_message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
