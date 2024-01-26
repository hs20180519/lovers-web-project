const passport = require("passport");
const GoogleLoginStrategy = require("../passport/googleLoginStrategy");

passport.use("google-login", GoogleLoginStrategy);

const authenticateGoogleLogin = (req, res, next) => {
  passport.authenticate("google-login", { scope: ["email", "profile"] })(req, res, next);
};

const handleGoogleLoginCallback = (req, res, next) => {
  passport.authenticate("google-login", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Google login failed" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  authenticateGoogleLogin,
  handleGoogleLoginCallback,
};
