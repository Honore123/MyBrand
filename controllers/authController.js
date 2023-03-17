const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxPeriod = 24 * 60 * 60;
const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { name: "", email: "", password: "" };

  if (err.message == "Incorrect email") {
    errors.email = "Email not found";
  }
  if (err.message == "Incorrect password") {
    errors.password = "Incorrect password";
  }
  if (err.code == 11000) {
    errors.email = "Email already registered";

    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const createToken = (id) => {
  return jwt.sign({ id }, "amat victoria curam", {
    expiresIn: maxPeriod,
  });
};
module.exports.profile = (req, res) => {
  res.send("profile");
};
module.exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ data: user, status: 200, message: "Admin account created" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors, status: 400 });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httOnly: true, maxAge: maxPeriod * 1000 });
    res.status(200).json({
      data: [user],
      status: 200,
      message: "Logged successfully",
    });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors, status: 400 });
  }
};
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ status: 200, message: "Successfully logged out" });
};
