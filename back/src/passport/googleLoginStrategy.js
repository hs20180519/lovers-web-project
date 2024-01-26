const { Strategy } = require("passport-google-oauth20");
const { PrismaClient } = require("@prisma/client");
const logger = require("../config/logger");
const { sign } = require("jsonwebtoken");
const prisma = new PrismaClient();
require("dotenv").config();

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const googleLoginStrategy = new Strategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          email: profile.emails[0].value,
        },
      });
      // 사용자가 이미 존재하면 해당 사용자를 반환
      if (existingUser) {
        return done(null, existingUser);
      }
      // 사용자가 존재하지 않으면 새로운 사용자를 생성
      const newUser = await prisma.users.create({
        data: {
          email: profile.emails[0].value,
          nickname: profile.displayName || "Guest",
          profile_image:
            profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
        },
      });
      const token = sign({ user_id: newUser.user_id }, process.env.MY_SECRET_KEY, {
        expiresIn: "24h",
      });
      return done(null, { user: newUser, token });
    } catch (error) {
      logger.error("Error in Google login strategy", error);
      return done(error, false);
    }
  },
);

module.exports = googleLoginStrategy;
