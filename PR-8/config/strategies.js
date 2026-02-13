const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../model/admin.model");
const User = require("../model/user.model");

passport.use(
  "admin-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email });
        if (!admin || admin.password !== password) {
          return done(null, false, { message: "Invalid admin credentials" });}
        admin.role = "admin";
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "user-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          return done(null, false, { message: "Invalid user credentials" });
        }
        user.role = "user";
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user._id, role: user.role });
});

passport.deserializeUser(async (data, done) => {
  try {
    if (data.role === "admin") {
      const admin = await Admin.findById(data.id);
      return done(null, admin);
    } else {
      const user = await User.findById(data.id);
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
});


passport.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/user/loginUser");
};

passport.setAuthenticateUser = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};

module.exports = passport;