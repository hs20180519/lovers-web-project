const { Strategy, ExtractJwt } = require("passport-jwt");
const { PrismaClient } = require("@prisma/client");
const logger = require("../config/logger");
const prisma = new PrismaClient();
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MY_SECRET_KEY, // 암호화에 사용할 시크릿 키
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    // payload에서 유저 정보를 가져와서 인증 처리
    const user = await prisma.users.findFirst({
      where: {
        user_id: payload.user_id,
      },
    });
    if (!user) {
      // 인증 실패
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    logger.error("Error in jwt strategy", error);
    return done(error, false);
  }
});

module.exports = jwtStrategy;
