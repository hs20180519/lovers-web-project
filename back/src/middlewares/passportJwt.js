const passport = require("passport");
const JwtStrategy = require("../passport/jwtStrategy");

passport.use("jwt", JwtStrategy);

const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  authenticateJwt,
};
