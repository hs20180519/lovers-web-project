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
    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: { profile_image: filename },
    });
    if (!updatedUser) {
      throw new Error("Failed to upload profile image");
    }
    return updatedUser;
  }
}

module.exports = new UserService();
