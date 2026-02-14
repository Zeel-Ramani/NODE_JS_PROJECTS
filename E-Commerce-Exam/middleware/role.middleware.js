exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ message: "Admin only" });
  }
  next();
};
