const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

//사용자의 식별을 이메일로
const localOptions = { usernameField: "nickname", passwordField: "password" };

const localStrategy = new LocalStrategy(localOptions, async (nickname, password, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: { nickname },
    });
    if (!user) {
      return done(null, false, { message: "Incorrect nickname" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    logger.error("Error in local strategy", error);
    return done(error, false);
  }
});

module.exports = localStrategy;
