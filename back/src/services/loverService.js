const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LoverService {
  async makeLoverId(userAId, userBId) {
    try {
      return await prisma.lovers.create({
        data: {
          user_a_id: userAId,
          user_b_id: userBId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LoverService();
