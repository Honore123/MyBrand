const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.get("authorization");

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "amat victoria curam", (err, decodedToken) => {
      if (err) {
        res.status(400).json({ status: 400, message: err.message });
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ status: 400, message: "You're not logged in" });
  }
};

module.exports = { authMiddleware };
