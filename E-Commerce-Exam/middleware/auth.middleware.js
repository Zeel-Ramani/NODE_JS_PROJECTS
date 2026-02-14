const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.json({ message: "No token" });

  const decoded = jwt.verify(token, "secret123");
  req.user = decoded;

  next();
};
