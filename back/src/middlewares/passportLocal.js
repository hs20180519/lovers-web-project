const passport = require("passport");
const localStrategy = require("../passport/localStrategy");

passport.use("local", localStrategy);

const authenticateLocal = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: info.message || "Authentication failed" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  authenticateLocal,
};
