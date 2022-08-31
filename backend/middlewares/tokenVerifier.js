const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send("Authorization header required");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, (err, object) => {
    if (err)
      return res.status(403).send("Token is invalid (Token might be expired)");
    req.user = object;
    next();
  });
};

module.exports = verifyToken;
