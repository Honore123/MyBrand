const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
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
