const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class UserService {
  async getUserProfile(userId) {
    try {
      return await prisma.users.findUnique({
        where: { user_id: userId },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
