const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthService {
  async registerUser(email, password, nickname) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          nickname,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    //localStrategy 에서 검증함
    //다른 예외 처리 필요
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      if (!user) {
        return null;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
