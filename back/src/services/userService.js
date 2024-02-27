const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class UserService {
  async getUserProfile(userId) {
    const userProfile = await prisma.users.findUnique({
      where: { user_id: userId },
    });
    if (!userProfile) {
      throw new Error(`User not found with userId ${userId}`);
    }
    return userProfile;
  }

  async uploadProfileImage(userId, filename) {
    await prisma.users.update({
      where: { user_id: userId },
      data: { profile_image: filename },
    });
  }

  async getLoverIdByUserId(userId) {
    const user = await prisma.lovers.findFirst({
      where: {
        OR: [{ user_a_id: userId }, { user_b_id: userId }],
      },
    });
    if (!user) {
      throw new Error(`Lover User not found with userId ${userId}`);
    }
    return user.lover_id;
  }
}

module.exports = new UserService();
