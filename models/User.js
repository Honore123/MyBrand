const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: [8, "Minimum length 8 characters"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const loggedUser = await this.findOne({ email }).select("-password");
      return loggedUser;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
