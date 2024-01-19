const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

//사용자의 식별을 이메일로
const localOptions = { usernameField: "email", passwordField: "password" };

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    logger.error("Error in local strategy", error);
    return done(error, false, { message: "Internal server error" });
  }
});

module.exports = localStrategy;
